import admin from "firebase-admin";

const AUTH_APP_NAME = "hushh-website-auth";
const AUTH_SERVICE_ACCOUNT_ENV = "FIREBASE_AUTH_SERVICE_ACCOUNT_JSON";
const DEFAULT_SERVICE_ACCOUNT_ENV = "FIREBASE_SERVICE_ACCOUNT_JSON";

function getExistingAppByName(name) {
  return admin.apps.find((candidate) => candidate?.name === name) ?? null;
}

function parseServiceAccount(rawValue) {
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn("Failed to parse Firebase service account JSON:", error);
    return null;
  }
}

function initializeFirebaseAdmin() {
  const authServiceAccount = parseServiceAccount(process.env[AUTH_SERVICE_ACCOUNT_ENV]);
  if (authServiceAccount) {
    const existingAuthApp = getExistingAppByName(AUTH_APP_NAME);
    if (existingAuthApp) {
      return existingAuthApp;
    }

    return admin.initializeApp(
      {
        credential: admin.credential.cert(authServiceAccount),
      },
      AUTH_APP_NAME
    );
  }

  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  const defaultServiceAccount = parseServiceAccount(process.env[DEFAULT_SERVICE_ACCOUNT_ENV]);
  if (defaultServiceAccount) {
    return admin.initializeApp({
      credential: admin.credential.cert(defaultServiceAccount),
    });
  }

  return admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const app = initializeFirebaseAdmin();
const auth = admin.auth(app);

export { admin, auth };

export async function verifyIdToken(idToken) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return { valid: true, uid: decodedToken.uid, decodedToken };
  } catch (error) {
    console.error("Firebase token verification failed:", error);
    return { valid: false, uid: null, decodedToken: null };
  }
}

export async function createSessionCookie(
  idToken,
  expiresIn = 5 * 24 * 60 * 60 * 1000
) {
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    return { success: true, sessionCookie };
  } catch (error) {
    console.error("Firebase session cookie creation failed:", error);
    return { success: false, sessionCookie: null };
  }
}

export async function verifySessionCookie(sessionCookie, checkRevoked = true) {
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, checkRevoked);
    return { valid: true, uid: decodedClaims.uid, decodedClaims };
  } catch (error) {
    console.error("Firebase session cookie verification failed:", error);
    return { valid: false, uid: null, decodedClaims: null };
  }
}
