"use client";

export const HIDE_CHROME_PATHS = [
  "/hushh-v02",
  "/viva-connect",
  "/viva-connect/qrPage",
  "/qrCodePage",
];

export function normalizeChromePath(pathname) {
  if (!pathname) {
    return "/";
  }

  return pathname.split("?")[0].split("#")[0] || "/";
}

export function shouldHideChrome(pathname) {
  const normalizedPath = normalizeChromePath(pathname);

  return HIDE_CHROME_PATHS.some(
    (hiddenPath) => normalizedPath === hiddenPath || normalizedPath.startsWith(`${hiddenPath}/`),
  );
}
