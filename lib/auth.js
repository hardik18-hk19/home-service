
// lib/auth.js

import NextAuth from 'next-auth';
import { OAuthProvider } from 'next-auth/providers';

const DescopeProvider = (options) => {
    return OAuthProvider({
        id: 'descope',
        name: 'Descope',
        authorization: {
            url: `https://api.descope.com/oauth2/v1/authorize`,
            params: {
                scope: 'openid email profile',
            },
        },
        token: {
            url: `https://api.descope.com/oauth2/v1/token`,
        },
        userinfo: {
            url: `https://api.descope.com/oauth2/v1/userinfo`,
        },
        profile(profile) {
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            };
        },
        ...options,
    });
};

export const authOptions = {
    providers: [
        DescopeProvider({
            clientId: process.env.DESCOPE_CLIENT_ID,
            clientSecret: process.env.DESCOPE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                return {
                    ...token,
                    access_token: account.access_token,
                    expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
                    refresh_token: account.refresh_token,
                    profile: {
                        name: profile?.name,
                        email: profile?.email,
                        image: profile?.picture,
                    },
                };
            } else if (Date.now() < token.expires_at * 1000) {
                return token;
            } else {
                try {
                    const response = await fetch("https://api.descope.com/oauth2/v1/token", {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            client_id: process.env.DESCOPE_CLIENT_ID,
                            client_secret: process.env.DESCOPE_CLIENT_SECRET,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token,
                        }),
                        method: "POST",
                    });

                    const tokens = await response.json();

                    if (!response.ok) throw tokens;

                    return {
                        ...token,
                        access_token: tokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                        refresh_token: tokens.refresh_token ?? token.refresh_token,
                    };
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
        },

        async session({ session, token }) {
            if (token.profile) {
                session.user = token.profile;
            }

            session.error = token.error;
            session.accessToken = token.access_token;
            return session;
        },
    },
};
