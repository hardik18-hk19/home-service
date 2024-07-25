import NextAuth from "next-auth";
import OAuthProvider from "next-auth/providers/oauth";

const authOptions = {
  providers: [
    OAuthProvider({
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2jTnUl3jDsd7UnKVF2r8hMFevDB/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: process.env.DESCOPE_CLIENT_ID,
      clientSecret: process.env.DESCOPE_CLIENT_SECRET,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expires_at = Math.floor(Date.now() / 1000 + account.expires_in);
        token.refresh_token = account.refresh_token;
        token.profile = profile;
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await fetch(
            "https://api.descope.com/oauth2/v1/token",
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_id: process.env.DESCOPE_CLIENT_ID,
                client_secret: process.env.DESCOPE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token,
              }),
              method: "POST",
            }
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          token.accessToken = tokens.access_token;
          token.expires_at = Math.floor(Date.now() / 1000 + tokens.expires_in);
          token.refresh_token = tokens.refresh_token ?? token.refresh_token;
        } catch (error) {
          console.error("Error refreshing access token", error);
          token.error = "RefreshAccessTokenError";
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.profile;
      session.error = token.error;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
