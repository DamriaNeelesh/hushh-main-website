import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";

const isProduction = process.env.NODE_ENV === "production";

function buildProviders() {
  const providers = [];

  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    );
  }

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    );
  }

  if (
    process.env.APPLE_CLIENT_ID
    && process.env.APPLE_TEAM_ID
    && process.env.APPLE_PRIVATE_KEY
    && process.env.APPLE_KEY_ID
  ) {
    providers.push(
      AppleProvider({
        clientId: process.env.APPLE_CLIENT_ID,
        clientSecret: {
          appleId: process.env.APPLE_CLIENT_ID,
          teamId: process.env.APPLE_TEAM_ID,
          privateKey: process.env.APPLE_PRIVATE_KEY,
          keyId: process.env.APPLE_KEY_ID,
        },
      }),
    );
  }

  return providers;
}

const authOptions = {
  providers: buildProviders(),
  cookies: {
    pkceCodeVerifier: {
      name: isProduction ? "__Secure-next-auth.pkce.code_verifier" : "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  useSecureCookies: isProduction,
  callbacks: {
    async session({ session, token }) {
      if (session.user && session.user.email) {
        session.id = token.uid || token.sub || null;
        session.userName = token.userName || session.user.name || null;
        session.provider = token.provider || null;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user?.id) {
        token.uid = user.id;
      }
      if (user?.userName) {
        token.userName = user.userName;
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
