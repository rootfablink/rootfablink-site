import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET;
const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

export const googleOAuthConfigured = Boolean(googleClientId && googleClientSecret && authSecret);

export const authOptions: NextAuthOptions = {
  providers:
    googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
          })
        ]
      : [],
  secret: authSecret,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: "/tr/auth/login",
    error: "/auth/error"
  },
  callbacks: {
    async signIn({ user }) {
      return Boolean(user.email);
    },
    async jwt({ token, account, profile }) {
      if (account?.provider) token.provider = account.provider;
      if (profile?.email) token.email = profile.email;
      if (profile?.name) token.name = profile.name;
      const picture = profile && "picture" in profile ? profile.picture : undefined;
      if (typeof picture === "string") token.picture = picture;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email;
        session.user.name = token.name ?? session.user.name;
        session.user.image = typeof token.picture === "string" ? token.picture : session.user.image;
        session.user.provider = typeof token.provider === "string" ? token.provider : "google";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/tr`;
    }
  },
  events: {
    async signIn({ user, account }) {
      console.info("[auth] Successful sign-in", {
        provider: account?.provider,
        email: user.email
      });
    }
  }
};
