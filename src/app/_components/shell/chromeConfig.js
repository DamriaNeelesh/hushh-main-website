"use client";

export const HIDE_CHROME_PATHS = [
  "/viva-connect",
  "/viva-connect/qrPage",
  "/qrCodePage",
];

// Paths where chrome is hidden via exact match only (no prefix matching)
export const HIDE_CHROME_EXACT_PATHS = ["/"];

export function normalizeChromePath(pathname) {
  if (!pathname) {
    return "/";
  }

  return pathname.split("?")[0].split("#")[0] || "/";
}

export function shouldHideChrome(pathname) {
  const normalizedPath = normalizeChromePath(pathname);

  if (HIDE_CHROME_EXACT_PATHS.includes(normalizedPath)) {
    return true;
  }

  return HIDE_CHROME_PATHS.some(
    (hiddenPath) => normalizedPath === hiddenPath || normalizedPath.startsWith(`${hiddenPath}/`),
  );
}
