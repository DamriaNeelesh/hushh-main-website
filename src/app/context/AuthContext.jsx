"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import authentication from "../../lib/auth/authentication";
import { subscribeToAuthChanges } from "../../lib/firebase/authService";
import { normalizeAuthUser } from "../../lib/firebase/user";
import { createWebsiteSession, getWebsiteSession } from "../../lib/auth/sessionClient";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [checkingMFA] = useState(false);
  const [mfaRequired] = useState(false);
  const [mfaEnrollmentNeeded] = useState(false);
  const [currentFactorId] = useState(null);
  const [currentChallengeId] = useState(null);

  const applyAuthState = useCallback((nextUser) => {
    const normalizedUser = normalizeAuthUser(nextUser);
    setUser(normalizedUser);
    setSession(normalizedUser ? { user: normalizedUser } : null);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const result = await getWebsiteSession();

      if (result.ok && result.authenticated && result.user) {
        applyAuthState(result.user);
        return result.user;
      }

      applyAuthState(null);
      return null;
    } catch (error) {
      console.error("Error refreshing auth session:", error);
      applyAuthState(null);
      return null;
    }
  }, [applyAuthState]);

  useEffect(() => {
    let isMounted = true;

    const hydrateAuth = async () => {
      try {
        const result = await getWebsiteSession();

        if (!isMounted) return;

        if (result.ok && result.authenticated && result.user) {
          applyAuthState(result.user);
        } else {
          applyAuthState(null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        if (isMounted) {
          applyAuthState(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void hydrateAuth();

    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (!isMounted) return;

      if (!firebaseUser) {
        return;
      }

      try {
        const idToken = await firebaseUser.getIdToken();
        await createWebsiteSession(idToken);
        if (isMounted) {
          applyAuthState(firebaseUser);
        }
      } catch (error) {
        console.warn("Failed to synchronize Firebase auth with website session:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [applyAuthState]);

  const signIn = async (callback, customRedirectPath) => {
    const result = await authentication.googleSignIn(callback, customRedirectPath);
    await refreshSession();
    return result;
  };

  const signInWithApple = async (callback, customRedirectPath) => {
    const result = await authentication.appleSignIn(callback, customRedirectPath);
    await refreshSession();
    return result;
  };

  const signOut = async () => {
    const result = await authentication.signOut();
    if (!result.error) {
      applyAuthState(null);
    }
    return result;
  };

  const completeMFAEnrollment = async () => null;
  const completeMFAVerification = async () => null;
  const refreshMFAStatus = async () => null;

  const value = {
    session,
    user,
    loading,
    signIn,
    signInWithApple,
    signOut,
    isAuthenticated: !!session,
    checkingMFA,
    mfaRequired,
    mfaEnrollmentNeeded,
    currentFactorId,
    currentChallengeId,
    completeMFAEnrollment,
    completeMFAVerification,
    refreshMFAStatus,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
