"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ClipboardCopy, KeyRound, LogOut, RefreshCcw, ShieldCheck } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getCurrentFirebaseIdToken } from "../../../lib/firebase/authService";
import {
  DEVELOPER_ACCESS_NOTES,
  buildWorkspaceSnippets,
} from "../../../lib/developers/content";
import {
  DeveloperPortalRequestError,
  enableDeveloperAccess,
  getDeveloperAccess,
  rotateDeveloperAccessToken,
  updateDeveloperAccessProfile,
} from "../../../lib/developers/portalClient";

const EMPTY_PROFILE_DRAFT = {
  display_name: "",
  website_url: "",
  brand_image_url: "",
  support_url: "",
  policy_url: "",
};

function formatDeveloperAccessError(error, runtime, fallback) {
  if (
    error instanceof DeveloperPortalRequestError &&
    (error.code === "DEVELOPER_API_DISABLED" ||
      error.code === "DEVELOPER_API_DISABLED_IN_PRODUCTION")
  ) {
    if (runtime.environment === "local") {
      return `Developer access is turned off on ${runtime.apiOrigin}. Start the backend with DEVELOPER_API_ENABLED=true and refresh this page.`;
    }

    if (runtime.environment === "uat") {
      return `Developer access is not enabled on the current UAT backend yet. Turn on DEVELOPER_API_ENABLED for ${runtime.apiOrigin} and try again.`;
    }

    return "Developer access is not enabled on this production backend.";
  }

  return error instanceof Error ? error.message : fallback;
}

function deriveProfileDraft(access, user) {
  return {
    display_name:
      access?.app?.display_name ||
      user?.displayName ||
      (user?.email ? user.email.split("@")[0] : ""),
    website_url: access?.app?.website_url || "",
    brand_image_url: access?.app?.brand_image_url || "",
    support_url: access?.app?.support_url || "",
    policy_url: access?.app?.policy_url || "",
  };
}

async function copyText(value, label, toast) {
  if (!value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    toast({
      title: `${label} copied`,
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  } catch (error) {
    console.error(`[developers] failed to copy ${label.toLowerCase()}`, error);
    toast({
      title: `Could not copy ${label.toLowerCase()}`,
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  }
}

export default function DeveloperAccessWorkspace({ runtime }) {
  const {
    isAuthenticated,
    loading,
    user,
    signIn,
    signInWithApple,
    signOut,
  } = useAuth();
  const toast = useToast();
  const [access, setAccess] = useState(null);
  const [accessLoading, setAccessLoading] = useState(false);
  const [accessError, setAccessError] = useState(null);
  const [revealedToken, setRevealedToken] = useState(null);
  const [profileDraft, setProfileDraft] = useState(EMPTY_PROFILE_DRAFT);
  const [profileSaving, setProfileSaving] = useState(false);

  const workspaceSnippets = useMemo(
    () => buildWorkspaceSnippets(runtime, revealedToken || "<developer-token>"),
    [revealedToken, runtime]
  );

  const resolveIdToken = useCallback(async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const idToken = await getCurrentFirebaseIdToken();
      if (idToken) {
        return idToken;
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 180 * (attempt + 1));
      });
    }

    throw new Error("Your Firebase session is still initializing. Refresh and try again.");
  }, []);

  const syncAccessState = useCallback((payload) => {
    setAccess(payload);
    setProfileDraft(deriveProfileDraft(payload, user));
  }, [user]);

  const loadAccess = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setAccess(null);
      setAccessError(null);
      setRevealedToken(null);
      setProfileDraft(deriveProfileDraft(null, user));
      return;
    }

    setAccessLoading(true);
    setAccessError(null);

    try {
      const idToken = await resolveIdToken();
      const payload = await getDeveloperAccess(idToken);
      syncAccessState(payload);
    } catch (error) {
      setAccess(null);
      setAccessError(
        formatDeveloperAccessError(
          error,
          runtime,
          "Could not load your Kai developer access state."
        )
      );
    } finally {
      setAccessLoading(false);
    }
  }, [isAuthenticated, resolveIdToken, runtime, syncAccessState, user]);

  useEffect(() => {
    if (!loading) {
      void loadAccess();
    }
  }, [loadAccess, loading]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn(null, "/developers/on-boarding");
      toast({
        title: "Signed in",
        description: "Loading your Kai developer workspace.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Google sign-in failed",
        description: error?.message || "Unable to sign in with Google.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple(null, "/developers/on-boarding");
      toast({
        title: "Signed in",
        description: "Loading your Kai developer workspace.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Apple sign-in failed",
        description: error?.message || "Unable to sign in with Apple.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEnableAccess = async () => {
    if (!user) {
      return;
    }

    setAccessLoading(true);
    try {
      const idToken = await resolveIdToken();
      const payload = await enableDeveloperAccess(idToken);
      syncAccessState(payload);
      setRevealedToken(payload.raw_token || null);
      setAccessError(null);
      toast({
        title: "Developer access enabled",
        description: "Your app identity and token are ready below.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setAccessError(
        formatDeveloperAccessError(
          error,
          runtime,
          "Could not enable Kai developer access."
        )
      );
      toast({
        title: "Developer access failed",
        description: formatDeveloperAccessError(
          error,
          runtime,
          "Could not enable Kai developer access."
        ),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setAccessLoading(false);
    }
  };

  const handleRotateKey = async () => {
    if (!user) {
      return;
    }

    setAccessLoading(true);
    try {
      const idToken = await resolveIdToken();
      const payload = await rotateDeveloperAccessToken(idToken);
      syncAccessState(payload);
      setRevealedToken(payload.raw_token || null);
      setAccessError(null);
      toast({
        title: "Developer token rotated",
        description: "Save the new token now. It will only be shown once.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setAccessError(
        formatDeveloperAccessError(
          error,
          runtime,
          "Could not rotate the developer token."
        )
      );
      toast({
        title: "Token rotation failed",
        description: formatDeveloperAccessError(
          error,
          runtime,
          "Could not rotate the developer token."
        ),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setAccessLoading(false);
    }
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    setProfileSaving(true);
    try {
      const idToken = await resolveIdToken();
      const payload = await updateDeveloperAccessProfile(idToken, profileDraft);
      syncAccessState(payload);
      setAccessError(null);
      toast({
        title: "App identity updated",
        description: "Consent prompts will now use your latest developer profile.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const message = formatDeveloperAccessError(
        error,
        runtime,
        "Could not update the developer app profile."
      );
      setAccessError(message);
      toast({
        title: "Profile update failed",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setAccess(null);
      setAccessError(null);
      setRevealedToken(null);
      toast({
        title: "Signed out",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Could not sign out",
        description: error?.message || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const accessNotes = access?.notes?.length ? access.notes : DEVELOPER_ACCESS_NOTES;
  const providerSummary = access?.owner_provider_ids?.length
    ? access.owner_provider_ids.join(", ")
    : user?.providerId || "firebase";

  if (loading) {
    return (
      <div className="site-page-card developer-access-card">
        <p className="site-page-eyebrow">Developer workspace</p>
        <h3 className="developer-access-title">Checking your developer session</h3>
        <p className="developer-access-copy">
          Loading the shared Firebase identity and the local Kai access state.
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="developer-access-shell">
        <div className="site-page-card developer-access-card">
          <div className="developer-access-topline">
            <p className="site-page-eyebrow">Kai developer workspace</p>
            <span className="developer-access-badge">Sign in required</span>
          </div>
          <h3 className="developer-access-title">Use the same Firebase identity as Kai</h3>
          <p className="developer-access-copy">
            Sign in with Google or Apple to enable developer access, rotate a token, and
            keep the app identity shown during consent approval current.
          </p>
          <div className="developer-access-actions">
            <button type="button" className="site-cta-solid" onClick={handleGoogleSignIn}>
              Continue with Google
            </button>
            <button
              type="button"
              className="site-cta-outline-branded"
              onClick={handleAppleSignIn}
            >
              Continue with Apple
            </button>
            <Link
              href="/developers/login?redirect=/developers/on-boarding"
              className="developer-access-text-link"
            >
              Open the dedicated sign-in page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="developer-access-shell">
      <div className="developer-access-grid">
        <section className="site-page-card developer-access-card">
          <div className="developer-access-topline">
            <p className="site-page-eyebrow">Kai developer workspace</p>
            <span className="developer-access-badge">
              {access?.access_enabled ? "Access enabled" : "Ready to enable"}
            </span>
          </div>
          <h3 className="developer-access-title">Signed in as {user.email}</h3>
          <p className="developer-access-copy">
            This workspace uses your shared Firebase identity to manage one Kai developer app
            and one active developer token at a time.
          </p>

          <div className="developer-runtime-list developer-runtime-list--compact">
            <div className="developer-runtime-item">
              <span className="developer-runtime-label">Providers</span>
              <span className="developer-runtime-value">{providerSummary}</span>
            </div>
            <div className="developer-runtime-item">
              <span className="developer-runtime-label">Runtime</span>
              <span className="developer-runtime-value developer-runtime-value--mono">
                {runtime.apiOrigin}
              </span>
            </div>
            <div className="developer-runtime-item">
              <span className="developer-runtime-label">Active token</span>
              <span className="developer-runtime-value developer-runtime-value--mono">
                {access?.active_token?.token_prefix || "None yet"}
              </span>
            </div>
          </div>

          {accessError ? (
            <div className="developer-access-status developer-access-status--error">
              {accessError}
            </div>
          ) : null}

          <div className="developer-access-actions">
            {!access?.access_enabled ? (
              <button
                type="button"
                className="site-cta-solid"
                onClick={handleEnableAccess}
                disabled={accessLoading}
              >
                <ShieldCheck size={16} />
                {accessLoading ? "Enabling..." : "Enable developer access"}
              </button>
            ) : (
              <button
                type="button"
                className="site-cta-solid"
                onClick={handleRotateKey}
                disabled={accessLoading}
              >
                <RefreshCcw size={16} />
                {accessLoading ? "Rotating..." : "Rotate token"}
              </button>
            )}

            <button
              type="button"
              className="site-cta-outline-branded"
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>

          <ul className="developer-access-note-list">
            {accessNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="site-page-card developer-access-card">
          <div className="developer-access-topline">
            <p className="site-page-eyebrow">Token handling</p>
            <span className="developer-access-badge developer-access-badge--muted">
              Reveal once
            </span>
          </div>
          <h3 className="developer-access-title">Use the token like Kai expects</h3>
          <p className="developer-access-copy">
            The raw token is only shown after enable or rotate. After that, keep the env var
            and runtime URL handy, and use the stored prefix to verify which credential is active.
          </p>

          {revealedToken ? (
            <div className="developer-access-token-reveal">
              <p className="developer-access-token-title">New token revealed once</p>
              <p className="developer-access-copy developer-access-copy--tight">
                Save this now. It will not be shown again after you leave this page.
              </p>
              <code className="developer-access-token-value">{revealedToken}</code>
              <div className="developer-access-actions developer-access-actions--tight">
                <button
                  type="button"
                  className="site-cta-outline-branded"
                  onClick={() => copyText(revealedToken, "Developer token", toast)}
                >
                  <ClipboardCopy size={16} />
                  Copy token
                </button>
              </div>
            </div>
          ) : (
            <div className="developer-access-status">
              Rotate or enable access to reveal a fresh token. Until then, keep using the active
              token prefix shown on the left to confirm which credential is live.
            </div>
          )}

          <div className="developer-access-snippet-stack">
            <div className="developer-access-snippet">
              <div className="developer-access-snippet-topline">
                <p className="developer-runtime-label">Env var</p>
                <button
                  type="button"
                  className="developer-access-copy-button"
                  onClick={() =>
                    copyText(
                      `${access?.developer_token_env_var || "HUSHH_DEVELOPER_TOKEN"}=${revealedToken || "<developer-token>"}`,
                      "Developer env var",
                      toast
                    )
                  }
                >
                  <ClipboardCopy size={14} />
                  Copy
                </button>
              </div>
              <pre>
                <code>{`${access?.developer_token_env_var || "HUSHH_DEVELOPER_TOKEN"}=${revealedToken || "<developer-token>"}`}</code>
              </pre>
            </div>

            <div className="developer-access-snippet">
              <div className="developer-access-snippet-topline">
                <p className="developer-runtime-label">Remote MCP URL</p>
                <button
                  type="button"
                  className="developer-access-copy-button"
                  onClick={() => copyText(workspaceSnippets.remoteUrl, "Remote MCP URL", toast)}
                >
                  <ClipboardCopy size={14} />
                  Copy
                </button>
              </div>
              <pre>
                <code>{workspaceSnippets.remoteUrl}</code>
              </pre>
            </div>

            <div className="developer-access-snippet developer-access-snippet--compact">
              <div className="developer-access-inline-meta">
                <KeyRound size={16} />
                <span>
                  The canonical REST reference remains <Link href="/developers/agent-kai">Agent Kai API Reference</Link>.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {access?.access_enabled ? (
        <section className="site-page-card developer-access-card">
          <div className="developer-access-topline">
            <p className="site-page-eyebrow">App identity</p>
            <span className="developer-access-badge developer-access-badge--muted">
              Consent-facing
            </span>
          </div>
          <h3 className="developer-access-title">Keep your app identity current</h3>
          <p className="developer-access-copy">
            These values are shown to users inside Kai when they review or audit your consent
            requests. Keep them clear, current, and trustworthy.
          </p>

          <form className="developer-access-form" onSubmit={handleSaveProfile}>
            <label className="site-form-stack">
              <span className="site-form-label">App display name</span>
              <input
                className="site-form-input"
                value={profileDraft.display_name}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    display_name: event.target.value,
                  }))
                }
                placeholder="Your app name"
              />
            </label>

            <label className="site-form-stack">
              <span className="site-form-label">Website URL</span>
              <input
                className="site-form-input"
                value={profileDraft.website_url}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    website_url: event.target.value,
                  }))
                }
                placeholder="https://example.com"
              />
            </label>

            <label className="site-form-stack">
              <span className="site-form-label">Brand image URL</span>
              <input
                className="site-form-input"
                value={profileDraft.brand_image_url}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    brand_image_url: event.target.value,
                  }))
                }
                placeholder="https://example.com/logo.png"
              />
            </label>

            <label className="site-form-stack">
              <span className="site-form-label">Support URL</span>
              <input
                className="site-form-input"
                value={profileDraft.support_url}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    support_url: event.target.value,
                  }))
                }
                placeholder="https://example.com/support"
              />
            </label>

            <label className="site-form-stack developer-access-form-span">
              <span className="site-form-label">Policy URL</span>
              <input
                className="site-form-input"
                value={profileDraft.policy_url}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    policy_url: event.target.value,
                  }))
                }
                placeholder="https://example.com/privacy"
              />
            </label>

            <div className="developer-access-actions developer-access-form-span">
              <button
                type="submit"
                className="site-cta-solid"
                disabled={profileSaving}
              >
                {profileSaving ? "Saving..." : "Save app identity"}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
