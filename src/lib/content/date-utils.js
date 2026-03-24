import { format, isValid, parse, parseISO } from "date-fns";

const CONTENT_DATE_FORMATS = [
  "MMMM d, yyyy",
  "MMMM d yyyy",
  "MMM d, yyyy",
  "MMM d yyyy",
  "d MMMM yyyy",
  "d MMM yyyy",
  "yyyy-MM-dd",
  "yyyy/MM/dd",
  "MM/dd/yyyy",
];

export function parseContentDate(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const nativeDate = new Date(trimmed);
  if (isValid(nativeDate)) {
    return nativeDate;
  }

  const isoDate = parseISO(trimmed);
  if (isValid(isoDate)) {
    return isoDate;
  }

  for (const dateFormat of CONTENT_DATE_FORMATS) {
    const parsed = parse(trimmed, dateFormat, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;
}

export function getContentDateTimestamp(value) {
  return parseContentDate(value)?.getTime() ?? 0;
}

export function getContentDateIso(value) {
  return parseContentDate(value)?.toISOString() ?? null;
}

export function formatContentDate(value, dateFormat = "d MMM yyyy", fallback = "Recent post") {
  const parsed = parseContentDate(value);
  if (!parsed) {
    return fallback;
  }

  return format(parsed, dateFormat);
}
