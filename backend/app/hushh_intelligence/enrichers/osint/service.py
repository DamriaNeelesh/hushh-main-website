from __future__ import annotations

from datetime import datetime, timezone
import html
import re
import socket
from typing import Optional
from urllib.parse import urlparse

import httpx

from app.config import Settings
from app.hushh_intelligence.schemas.identity_exploration import (
    DomainAgeSignal,
    EmailDomainIntelligence,
    GeoContextSignal,
    GroundingChunk,
    OsintIntelligence,
    PassiveDnsRecord,
    ProfileCollections,
    WebsiteIntelligence,
)
from app.hushh_intelligence.services.identity_jobs import ReverseGeocodedAddress

TITLE_PATTERN = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
GENERATOR_PATTERN = re.compile(
    r'<meta[^>]+name=["\']generator["\'][^>]+content=["\']([^"\']+)["\']',
    re.IGNORECASE,
)


class SafeOsintEnricher:
    FREE_EMAIL_PROVIDERS = {
        "gmail.com",
        "googlemail.com",
        "outlook.com",
        "hotmail.com",
        "yahoo.com",
        "icloud.com",
        "proton.me",
        "protonmail.com",
    }
    ROLE_PREFIXES = {
        "admin",
        "contact",
        "hello",
        "help",
        "hr",
        "info",
        "jobs",
        "marketing",
        "no-reply",
        "noreply",
        "press",
        "sales",
        "security",
        "support",
        "team",
    }
    COUNTRY_TLDS = {
        "ae": "United Arab Emirates",
        "au": "Australia",
        "ca": "Canada",
        "de": "Germany",
        "fr": "France",
        "in": "India",
        "jp": "Japan",
        "sg": "Singapore",
        "uk": "United Kingdom",
        "us": "United States",
    }
    SOCIAL_HOSTS = {
        "linkedin.com",
        "github.com",
        "twitter.com",
        "x.com",
        "instagram.com",
        "facebook.com",
        "youtube.com",
        "tiktok.com",
        "medium.com",
    }
    CMS_RULES = (
        ("wordpress", re.compile(r"wp-content|wp-json", re.IGNORECASE)),
        ("shopify", re.compile(r"cdn\.shopify\.com|shopify", re.IGNORECASE)),
        ("wix", re.compile(r"wixstatic|wix\.com", re.IGNORECASE)),
        ("squarespace", re.compile(r"squarespace", re.IGNORECASE)),
        ("webflow", re.compile(r"webflow", re.IGNORECASE)),
        ("ghost", re.compile(r"ghost\/|ghost-", re.IGNORECASE)),
        ("drupal", re.compile(r"drupal-settings-json|Drupal", re.IGNORECASE)),
        ("joomla", re.compile(r"Joomla!", re.IGNORECASE)),
    )

    def __init__(self, settings: Settings) -> None:
        timeout_seconds = min(settings.http_timeout_seconds, 5.0)
        self._client = httpx.Client(
            timeout=timeout_seconds,
            follow_redirects=True,
            headers={
                "User-Agent": "Hushh-Intelligence-OSINT/1.0",
                "Accept": "application/json, text/html;q=0.9,*/*;q=0.1",
            },
        )

    def enrich(
        self,
        *,
        email: str,
        address: Optional[ReverseGeocodedAddress],
        profiles: ProfileCollections,
        grounding_chunks: list[GroundingChunk],
    ) -> OsintIntelligence:
        normalized_email = email.strip().lower()
        email_domain = self._email_domain(normalized_email)

        passive_dns: list[PassiveDnsRecord] = []
        domain_age: list[DomainAgeSignal] = []
        website_intelligence: list[WebsiteIntelligence] = []
        geo_context: list[GeoContextSignal] = []

        email_domain_intelligence: Optional[EmailDomainIntelligence] = None
        if email_domain:
            dns_records = self._collect_dns(email_domain)
            passive_dns.extend(dns_records)
            age_signal = self._fetch_domain_age(email_domain)
            if age_signal:
                domain_age.append(age_signal)
            email_domain_intelligence = EmailDomainIntelligence(
                normalized_email=normalized_email,
                domain=email_domain,
                syntax_valid=self._is_valid_email(normalized_email),
                free_provider=email_domain in self.FREE_EMAIL_PROVIDERS,
                role_account=self._is_role_account(normalized_email),
                mx_records=self._find_record_values(dns_records, "MX"),
                dns_records=dns_records,
                domain_age=age_signal,
            )
            geo_context.extend(self._build_geo_signals(email_domain, "email_domain"))

        if address and address.country:
            geo_context.append(
                GeoContextSignal(
                    label=f"Location context points to {address.country}",
                    source="resolved_address",
                )
            )

        seen_domains: set[str] = set()
        for domain, uri in self._candidate_domains(profiles, grounding_chunks):
            if domain in seen_domains:
                continue
            seen_domains.add(domain)

            if domain not in {entry.domain for entry in domain_age}:
                age_signal = self._fetch_domain_age(domain)
                if age_signal:
                    domain_age.append(age_signal)

            website_info = self._fetch_website_metadata(domain, uri)
            if website_info:
                website_intelligence.append(website_info)

            if domain not in self.SOCIAL_HOSTS:
                passive_dns.extend(
                    [
                        record
                        for record in self._collect_dns(domain)
                        if (record.record_type, tuple(record.values))
                        not in {(entry.record_type, tuple(entry.values)) for entry in passive_dns}
                    ]
                )

            geo_context.extend(self._build_geo_signals(domain, "domain_hint"))

            if len(website_intelligence) >= 4:
                break

        return OsintIntelligence(
            email_domain_intelligence=email_domain_intelligence,
            website_intelligence=website_intelligence,
            domain_age=domain_age,
            passive_dns=passive_dns,
            geo_context=self._dedupe_geo_context(geo_context),
        )

    def _collect_dns(self, domain: str) -> list[PassiveDnsRecord]:
        records: list[PassiveDnsRecord] = []
        for record_type in ("MX", "NS", "TXT", "A"):
            values = self._resolve_dns_record(domain, record_type)
            if values:
                records.append(PassiveDnsRecord(record_type=record_type, values=values))
        return records

    def _resolve_dns_record(self, domain: str, record_type: str) -> list[str]:
        try:
            response = self._client.get(
                "https://dns.google/resolve",
                params={"name": domain, "type": record_type},
            )
            response.raise_for_status()
        except Exception:
            return []

        payload = response.json()
        values: list[str] = []
        for answer in payload.get("Answer", []) or []:
            data = str(answer.get("data") or "").strip()
            if not data:
                continue
            if record_type == "MX" and " " in data:
                _, data = data.split(" ", 1)
            values.append(data.rstrip(".").strip('"'))
        return values[:8]

    def _fetch_domain_age(self, domain: str) -> Optional[DomainAgeSignal]:
        try:
            response = self._client.get(f"https://rdap.org/domain/{domain}")
            response.raise_for_status()
        except Exception:
            return None

        payload = response.json()
        created_at: Optional[datetime] = None
        for event in payload.get("events", []) or []:
            action = str(event.get("eventAction") or "").lower()
            if action in {"registration", "registration action"}:
                created_at = self._parse_datetime(event.get("eventDate"))
                break

        registrar = None
        for entity in payload.get("entities", []) or []:
            roles = {str(role).lower() for role in entity.get("roles", []) or []}
            if "registrar" not in roles:
                continue
            registrar = self._extract_entity_name(entity)
            if registrar:
                break

        age_days = None
        if created_at:
            age_days = max(0, int((datetime.now(timezone.utc) - created_at).total_seconds() // 86400))

        return DomainAgeSignal(
            domain=domain,
            created_at=created_at,
            registrar=registrar,
            age_days=age_days,
        )

    def _fetch_website_metadata(self, domain: str, uri: str) -> Optional[WebsiteIntelligence]:
        target_url = uri if uri.startswith("http://") or uri.startswith("https://") else f"https://{domain}"

        response = None
        for candidate in (target_url, f"https://{domain}", f"http://{domain}"):
            try:
                response = self._client.get(candidate)
                response.raise_for_status()
                break
            except Exception:
                response = None

        html_body = response.text if response is not None else ""
        title = self._extract_title(html_body)
        generator = self._extract_generator(html_body)
        cms = self._detect_cms(html_body, generator)
        subdomains = self._fetch_subdomains(domain)
        ip_addresses = self._resolve_ip_addresses(domain)
        notes: list[str] = []

        if generator:
            notes.append(f"Generator header suggests {generator}")
        if cms:
            notes.append(f"Passive fingerprint suggests {cms}")
        if subdomains:
            notes.append(f"Certificate transparency exposed {len(subdomains)} subdomains")

        if not any((title, generator, cms, subdomains, ip_addresses)):
            return None

        return WebsiteIntelligence(
            domain=domain,
            url=target_url,
            title=title,
            generator=generator,
            cms=cms,
            subdomains=subdomains,
            ip_addresses=ip_addresses,
            notes=notes,
        )

    def _fetch_subdomains(self, domain: str) -> list[str]:
        try:
            response = self._client.get(
                "https://crt.sh/",
                params={"q": f"%.{domain}", "output": "json"},
            )
            response.raise_for_status()
        except Exception:
            return []

        entries = response.json()
        if not isinstance(entries, list):
            return []

        values: list[str] = []
        seen: set[str] = set()
        for entry in entries:
            name_value = str(entry.get("name_value") or "").strip()
            for candidate in name_value.splitlines():
                normalized = candidate.lstrip("*.").strip().lower()
                if not normalized or normalized == domain or not normalized.endswith(domain):
                    continue
                if normalized in seen:
                    continue
                seen.add(normalized)
                values.append(normalized)
                if len(values) >= 6:
                    return values
        return values

    def _resolve_ip_addresses(self, domain: str) -> list[str]:
        try:
            info = socket.getaddrinfo(domain, None)
        except Exception:
            return []

        addresses: list[str] = []
        seen: set[str] = set()
        for entry in info:
            address = entry[4][0]
            if ":" in address:
                continue
            if address in seen:
                continue
            seen.add(address)
            addresses.append(address)
            if len(addresses) >= 4:
                break
        return addresses

    def _candidate_domains(
        self,
        profiles: ProfileCollections,
        grounding_chunks: list[GroundingChunk],
    ) -> list[tuple[str, str]]:
        pairs: list[tuple[str, str]] = []
        candidate_sources = [
            *profiles.websites,
            *profiles.mentions,
            *profiles.socials,
            *profiles.github,
            *profiles.linkedin,
        ]

        for source in candidate_sources:
            domain = self._domain_from_uri(source.uri)
            if not domain:
                continue
            pairs.append((domain, source.uri))

        for chunk in grounding_chunks:
            domain = self._domain_from_uri(chunk.uri)
            if not domain:
                continue
            pairs.append((domain, chunk.uri))

        return pairs

    def _build_geo_signals(self, domain: str, source: str) -> list[GeoContextSignal]:
        host = domain.lower().split(".")
        if not host:
            return []
        tld = host[-1]
        country = self.COUNTRY_TLDS.get(tld)
        if not country:
            return []
        return [GeoContextSignal(label=f"ccTLD suggests {country}", source=source)]

    @staticmethod
    def _dedupe_geo_context(signals: list[GeoContextSignal]) -> list[GeoContextSignal]:
        deduped: list[GeoContextSignal] = []
        seen: set[tuple[str, str]] = set()
        for signal in signals:
            key = (signal.label, signal.source)
            if key in seen:
                continue
            seen.add(key)
            deduped.append(signal)
        return deduped

    @staticmethod
    def _email_domain(email: str) -> Optional[str]:
        if "@" not in email:
            return None
        return email.split("@", 1)[1].lower()

    @staticmethod
    def _is_valid_email(email: str) -> bool:
        return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email))

    def _is_role_account(self, email: str) -> bool:
        local_part = email.split("@", 1)[0].lower()
        return local_part in self.ROLE_PREFIXES

    @staticmethod
    def _find_record_values(records: list[PassiveDnsRecord], record_type: str) -> list[str]:
        for record in records:
            if record.record_type == record_type:
                return record.values
        return []

    @staticmethod
    def _domain_from_uri(uri: str) -> Optional[str]:
        try:
            parsed = urlparse(uri)
        except Exception:
            return None
        hostname = (parsed.hostname or "").lower()
        if hostname.startswith("www."):
            hostname = hostname[4:]
        return hostname or None

    @staticmethod
    def _extract_title(html_body: str) -> Optional[str]:
        match = TITLE_PATTERN.search(html_body or "")
        if not match:
            return None
        return html.unescape(match.group(1).strip())[:120] or None

    @staticmethod
    def _extract_generator(html_body: str) -> Optional[str]:
        match = GENERATOR_PATTERN.search(html_body or "")
        if not match:
            return None
        return html.unescape(match.group(1).strip())[:120] or None

    def _detect_cms(self, html_body: str, generator: Optional[str]) -> Optional[str]:
        material = " ".join(part for part in [html_body[:20000], generator or ""] if part)
        for label, pattern in self.CMS_RULES:
            if pattern.search(material):
                return label
        return None

    @staticmethod
    def _parse_datetime(value: object) -> Optional[datetime]:
        if not value:
            return None
        text = str(value).strip()
        if not text:
            return None
        try:
            normalized = text.replace("Z", "+00:00")
            parsed = datetime.fromisoformat(normalized)
        except ValueError:
            return None
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)

    @staticmethod
    def _extract_entity_name(entity: dict) -> Optional[str]:
        vcard = entity.get("vcardArray")
        if not isinstance(vcard, list) or len(vcard) < 2:
            return None
        for item in vcard[1]:
            if not isinstance(item, list) or len(item) < 4:
                continue
            if str(item[0]).lower() != "fn":
                continue
            return str(item[3]).strip() or None
        return None

    def close(self) -> None:
        self._client.close()
