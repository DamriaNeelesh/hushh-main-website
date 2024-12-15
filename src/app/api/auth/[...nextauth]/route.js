import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import axios from 'axios';
const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: {
        appleId: process.env.APPLE_CLIENT_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      }
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (
          credentials.email === "example@example.com" &&
          credentials.password === "password123"
        ) {
          return {
            id: 1,
            name: credentials.name,
            email: credentials.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session(session, token, user) {
      if (session.user && session.user.email) {
        session.accessToken = token.accessToken;
        // session.user.id = token.id;
        session.id = token.id
        session.userName = token.userName;
        console.log('Session from Post request:', session)
        try {
          // Make a POST request to your backend API to get the API token key
          const response = await axios.post(
            "https://developer-api-53407187172.us-central1.run.app/login",
            {
              email: session.user.email,
              first_name: session.user.name,
              password: session.token.sub,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          // If the request is successful, extract the API key from the response
          const apiKey = response.data.data.API_key;
          console.log('Response after sending User data', response)
          // Add the API key to the session
          session.API_key = apiKey;
          // console.log("API", apiKey);
          return response;
        } catch (error) {
          console.error("Error fetching API key:", error);
        }
      }
      return session;
    },
    async jwt({token, user}) {
      // User Id is unique identifier id === uid
      if (user?.id) {
          token.uid = user.id
      }
      if (user?.userName) {
          token.userName = user.userName;
      }
      return token
   },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
