import {
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, hasFirebaseClientConfig } from "./config";
import { normalizeAuthUser } from "./user";

function ensureFirebaseAuth() {
  if (!hasFirebaseClientConfig || !auth) {
    throw new Error("Firebase auth is not configured for this environment.");
  }

  return auth;
}

export async function signInWithGoogle() {
  const firebaseAuth = ensureFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(firebaseAuth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const idToken = await result.user.getIdToken();

  return {
    user: normalizeAuthUser(result.user),
    firebaseUser: result.user,
    idToken,
    accessToken: credential?.accessToken || null,
  };
}

export async function signInWithApple() {
  const firebaseAuth = ensureFirebaseAuth();
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");

  const result = await signInWithPopup(firebaseAuth, provider);
  const credential = OAuthProvider.credentialFromResult(result);
  const idToken = await result.user.getIdToken();

  return {
    user: normalizeAuthUser(result.user),
    firebaseUser: result.user,
    idToken,
    accessToken: credential?.accessToken || null,
  };
}

export async function signOutFirebase() {
  const firebaseAuth = ensureFirebaseAuth();
  await firebaseSignOut(firebaseAuth);
}

export function subscribeToAuthChanges(callback) {
  if (!hasFirebaseClientConfig || !auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

export async function getCurrentFirebaseIdToken() {
  if (!hasFirebaseClientConfig || !auth?.currentUser) {
    return null;
  }

  return auth.currentUser.getIdToken();
}
