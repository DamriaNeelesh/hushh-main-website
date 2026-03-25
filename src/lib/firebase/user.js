export function normalizeAuthUser(userLike) {
  if (!userLike) return null;

  const uid = userLike.uid || userLike.id || userLike.userId || null;
  const primaryProvider =
    userLike.providerId
    || userLike.provider_id
    || (Array.isArray(userLike.providerData) ? userLike.providerData[0]?.providerId : null)
    || null;

  return {
    uid,
    id: uid,
    email: userLike.email ?? null,
    displayName: userLike.displayName || userLike.name || null,
    photoURL: userLike.photoURL || userLike.photoUrl || userLike.picture || null,
    emailVerified: userLike.emailVerified ?? userLike.email_verified ?? false,
    providerId: primaryProvider,
    providerData: Array.isArray(userLike.providerData) ? userLike.providerData : [],
    access_token: userLike.access_token ?? null,
  };
}
