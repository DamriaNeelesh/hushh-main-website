"use client";

import { startTransition, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "hushh-v02-intelligence-session";
const POLL_INTERVAL_MS = 2000;
const MAX_THREAD_TURNS = 6;
const LANE_ME = "me";
const LANE_WEB = "web";

function readStoredPayload() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function normalizeStoredPayload(stored) {
  if (!stored || typeof stored !== "object") {
    return {
      activeLane: LANE_ME,
      meSession: null,
      meThread: [],
      webThread: [],
      meSearchResult: null,
      webSearchResult: null,
    };
  }

  if ("meSession" in stored || "webThread" in stored || "activeLane" in stored) {
    return {
      activeLane: stored.activeLane === LANE_WEB ? LANE_WEB : LANE_ME,
      meSession: stored.meSession || null,
      meThread: Array.isArray(stored.meThread) ? stored.meThread : [],
      webThread: Array.isArray(stored.webThread) ? stored.webThread : [],
      meSearchResult: stored.meSearchResult || null,
      webSearchResult: stored.webSearchResult || null,
    };
  }

  return {
    activeLane: LANE_ME,
    meSession: stored,
    meThread: [],
    webThread: [],
    meSearchResult: null,
    webSearchResult: null,
  };
}

function persistSnapshot(snapshot) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    return;
  }
}

function clearSnapshot() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

function createLocationError(message) {
  const error = new Error(message);
  error.code = "location_unavailable";
  return error;
}

async function readLocationPermissionState() {
  if (typeof window === "undefined" || !window.navigator?.permissions?.query) {
    return null;
  }

  try {
    const status = await window.navigator.permissions.query({ name: "geolocation" });
    return status?.state || null;
  } catch {
    return null;
  }
}

async function requestBrowserLocation() {
  if (typeof window === "undefined" || !window.navigator?.geolocation) {
    return Promise.reject(createLocationError("Geolocation is not available in this browser."));
  }

  const permissionState = await readLocationPermissionState();
  if (permissionState === "denied") {
    return Promise.reject(
      createLocationError("Location access is blocked for this site. Open your browser site settings, allow location, and try again.")
    );
  }

  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy_meters: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toISOString(),
        });
      },
      (error) => {
        if (error?.code === 1) {
          reject(
            createLocationError(
              "Location permission was not granted. Tap allow in the browser prompt to unlock Hushh Intelligence."
            )
          );
          return;
        }
        if (error?.code === 3) {
          reject(createLocationError("Location request timed out. Please try again."));
          return;
        }
        reject(createLocationError("Unable to read your current location."));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

function appendThreadEntry(thread, { query, intent, result }) {
  const nextEntry = {
    id: `${intent}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    query,
    intent,
    answer: result.answer,
    summary: result.summary || result.answer,
    confidence: result.confidence,
    warnings: result.warnings || [],
    createdAt: new Date().toISOString(),
  };
  return [...thread, nextEntry].slice(-MAX_THREAD_TURNS);
}

function buildHistory(thread) {
  return thread.slice(-MAX_THREAD_TURNS).map((entry) => ({
    query: entry.query,
    summary: entry.summary || entry.answer,
  }));
}

function buildPageErrorMessage(error) {
  const message = error instanceof Error ? error.message : "We paused while mapping your public footprint.";
  if (message.includes("Identity context is not ready yet")) {
    return "We are still mapping your public footprint. Please wait a moment and try again.";
  }
  if (message.includes("Identity bootstrap failed")) {
    return "We could not finish researching your public footprint. Try again.";
  }
  if (message.includes("Failed to create identity context")) {
    return "We captured your consent, but could not start the intelligence pass. Try again.";
  }
  return message;
}

function buildSearchErrorMessage(error, lane) {
  const message = error instanceof Error ? error.message : "Search failed.";
  if (lane === LANE_WEB) {
    return message.includes("Failed to reach")
      ? "We could not reach the grounded web-search service. Please try again."
      : message;
  }
  return buildPageErrorMessage(error);
}

function inferPhase(currentSession) {
  if (!currentSession) {
    return "locked";
  }
  if (currentSession.dossier) {
    return "ready";
  }
  if (currentSession.profile) {
    return "researching-dossier";
  }
  if (currentSession.jobId || currentSession.location) {
    return "researching-profile";
  }
  return "locked";
}

export function useHushhV02Intelligence() {
  const initialStateRef = useRef(normalizeStoredPayload(readStoredPayload()));
  const workflowRunIdRef = useRef(0);

  const [activeLane, setActiveLaneState] = useState(initialStateRef.current.activeLane);
  const [session, setSession] = useState(initialStateRef.current.meSession);
  const [meThread, setMeThread] = useState(initialStateRef.current.meThread);
  const [webThread, setWebThread] = useState(initialStateRef.current.webThread);
  const [phase, setPhase] = useState(inferPhase(initialStateRef.current.meSession));
  const [phaseError, setPhaseError] = useState("");
  const [meSearchStatus, setMeSearchStatus] = useState("idle");
  const [meSearchError, setMeSearchError] = useState("");
  const [meSearchResult, setMeSearchResult] = useState(initialStateRef.current.meSearchResult);
  const [webSearchStatus, setWebSearchStatus] = useState("idle");
  const [webSearchError, setWebSearchError] = useState("");
  const [webSearchResult, setWebSearchResult] = useState(initialStateRef.current.webSearchResult);

  useEffect(() => {
    persistSnapshot({
      activeLane,
      meSession: session,
      meThread,
      webThread,
      meSearchResult,
      webSearchResult,
    });
  }, [activeLane, session, meThread, webThread, meSearchResult, webSearchResult]);

  function commitSession(nextSession) {
    startTransition(() => {
      setSession(nextSession);
    });
    return nextSession;
  }

  function isStaleRun(runId) {
    return runId !== workflowRunIdRef.current;
  }

  function resetMeSearchState() {
    startTransition(() => {
      setMeSearchResult(null);
      setMeSearchStatus("idle");
      setMeSearchError("");
    });
  }

  async function createProfileJob(currentSession, runId) {
    const createResponse = await fetch("/api/hushh-intelligence/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            name: currentSession.name,
            email: currentSession.email,
            location: currentSession.location,
          },
        ],
      }),
    });

    const createPayload = await createResponse.json().catch(() => ({}));
    if (!createResponse.ok) {
      throw new Error(createPayload?.detail || createPayload?.error || "Failed to create identity context.");
    }
    if (isStaleRun(runId)) {
      return null;
    }

    return commitSession({
      ...currentSession,
      jobId: createPayload.job_id,
      createdAt: createPayload.created_at,
      expiresAt: createPayload.expires_at,
    });
  }

  async function pollProfileJob(currentSession, runId) {
    while (!isStaleRun(runId)) {
      const response = await fetch(`/api/hushh-intelligence/profile/${currentSession.jobId}`, {
        method: "GET",
        cache: "no-store",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.detail || payload?.error || "Failed to poll Hushh Intelligence profile.");
      }

      const completedItem = (payload.items || []).find((item) => item.status === "completed" && item.result);
      if (completedItem) {
        if (isStaleRun(runId)) {
          return null;
        }
        return commitSession({
          ...currentSession,
          profile: completedItem.result,
          itemId: completedItem.item_id,
        });
      }

      const failedItem = (payload.items || []).find((item) => item.status === "failed");
      if (failedItem) {
        throw new Error(failedItem?.error?.message || "We could not verify this identity context.");
      }

      if (payload.status === "failed") {
        throw new Error("We could not finish verifying this identity context.");
      }

      await new Promise((resolve) => window.setTimeout(resolve, POLL_INTERVAL_MS));
    }

    return null;
  }

  async function fetchDossier(currentSession, runId) {
    const response = await fetch("/api/hushh-intelligence/dossier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_id: currentSession.jobId,
      }),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload?.detail || payload?.error || "Failed to build the first intelligence dossier.");
    }
    if (isStaleRun(runId)) {
      return null;
    }

    return commitSession({
      ...currentSession,
      dossier: payload,
      pendingQuery: currentSession.pendingQuery || "",
    });
  }

  async function continueResearch(initialSession) {
    const runId = ++workflowRunIdRef.current;

    setPhaseError("");
    resetMeSearchState();

    try {
      let currentSession = initialSession;

      if (!currentSession?.jobId) {
        setPhase("researching-profile");
        currentSession = await createProfileJob(currentSession, runId);
      }

      if (!currentSession || isStaleRun(runId)) {
        return null;
      }

      if (!currentSession.profile) {
        setPhase("researching-profile");
        currentSession = await pollProfileJob(currentSession, runId);
      }

      if (!currentSession || isStaleRun(runId)) {
        return null;
      }

      if (!currentSession.dossier) {
        setPhase("researching-dossier");
        currentSession = await fetchDossier(currentSession, runId);
      }

      if (!currentSession || isStaleRun(runId)) {
        return null;
      }

      setPhase("ready");
      setPhaseError("");
      return currentSession;
    } catch (error) {
      if (isStaleRun(runId)) {
        return null;
      }

      setPhase("error");
      setPhaseError(buildPageErrorMessage(error));
      throw error;
    }
  }

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.dossier) {
      setPhase("ready");
      return;
    }

    if (session.profile || session.jobId || session.location) {
      setPhase(inferPhase(session));
      void continueResearch(session);
      return;
    }

    setPhase("locked");
  }, []);

  const isReady = Boolean(session?.jobId && session?.dossier);

  async function submitIdentity({ name, email, pendingQuery, onConsentGranted }) {
    setActiveLaneState(LANE_ME);
    setPhase("requesting-location");
    setPhaseError("");
    resetMeSearchState();
    setMeThread([]);

    try {
      const location = await requestBrowserLocation();
      const currentSession = commitSession({
        name,
        email,
        location,
        pendingQuery: pendingQuery?.trim() || "",
        researchStartedAt: new Date().toISOString(),
      });
      onConsentGranted?.();
      return await continueResearch(currentSession);
    } catch (error) {
      setPhase("locked");
      setPhaseError(buildPageErrorMessage(error));
      throw error;
    }
  }

  async function retryResearch() {
    if (!session) {
      return null;
    }

    const nextSession = commitSession({
      ...session,
      researchStartedAt: new Date().toISOString(),
    });
    return continueResearch(nextSession);
  }

  function setPendingQuery(nextQuery) {
    if (!session) {
      return;
    }

    commitSession({
      ...session,
      pendingQuery: nextQuery,
    });
  }

  async function runMeSearch({ query, intent }) {
    if (!session?.jobId) {
      throw new Error("Identity context is not ready yet");
    }

    setMeSearchStatus("searching");
    setMeSearchError("");

    try {
      const response = await fetch("/api/hushh-intelligence/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: session.jobId,
          query,
          intent,
          history: buildHistory(meThread),
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.detail || payload?.error || "Hushh Intelligence search failed.");
      }

      setMeSearchStatus("done");
      setMeSearchResult(payload);
      setMeThread((current) => appendThreadEntry(current, { query, intent, result: payload }));
      if (session.pendingQuery) {
        commitSession({
          ...session,
          pendingQuery: "",
        });
      }
      return payload;
    } catch (error) {
      setMeSearchStatus("idle");
      setMeSearchError(buildSearchErrorMessage(error, LANE_ME));
      throw error;
    }
  }

  async function runWebSearch({ query, intent }) {
    setWebSearchStatus("searching");
    setWebSearchError("");

    try {
      const response = await fetch("/api/hushh-intelligence/web-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          intent,
          history: buildHistory(webThread),
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.detail || payload?.error || "Grounded web search failed.");
      }

      setWebSearchStatus("done");
      setWebSearchResult(payload);
      setWebThread((current) => appendThreadEntry(current, { query, intent, result: payload }));
      return payload;
    } catch (error) {
      setWebSearchStatus("idle");
      setWebSearchError(buildSearchErrorMessage(error, LANE_WEB));
      throw error;
    }
  }

  async function runSearch({ query, intent, lane = activeLane }) {
    if (lane === LANE_WEB) {
      return runWebSearch({ query, intent });
    }
    return runMeSearch({ query, intent });
  }

  function setActiveLane(lane) {
    if (lane === "kai") {
      if (typeof window !== "undefined") {
        window.location.assign("/products/kai");
      }
      return;
    }

    setActiveLaneState(lane === LANE_WEB ? LANE_WEB : LANE_ME);
  }

  function clearSession() {
    workflowRunIdRef.current += 1;
    clearSnapshot();
    startTransition(() => {
      setActiveLaneState(LANE_ME);
      setSession(null);
      setPhase("locked");
      setPhaseError("");
      setMeThread([]);
      setMeSearchResult(null);
      setMeSearchStatus("idle");
      setMeSearchError("");
    });
  }

  function clearWebThread() {
    startTransition(() => {
      setWebThread([]);
      setWebSearchResult(null);
      setWebSearchStatus("idle");
      setWebSearchError("");
    });
  }

  const activeThread = activeLane === LANE_WEB ? webThread : meThread;
  const searchStatus = activeLane === LANE_WEB ? webSearchStatus : meSearchStatus;
  const searchError = activeLane === LANE_WEB ? webSearchError : meSearchError;
  const searchResult = activeLane === LANE_WEB ? webSearchResult : meSearchResult;

  return {
    activeLane,
    setActiveLane,
    session,
    dossier: session?.dossier || null,
    isReady,
    phase,
    phaseError,
    searchStatus,
    searchError,
    searchResult,
    meThread,
    webThread,
    activeThread,
    submitIdentity,
    retryResearch,
    setPendingQuery,
    runSearch,
    clearSession,
    clearWebThread,
  };
}
