import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { verifyPhoneNumber } from "./user.actions";
import println from "@/utils/print";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async authorized({ auth, request }) {
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          loginUser: user.loginUser,
        };
      }
      //https://github.com/nextauthjs/next-auth/discussions/3941#discussioncomment-5524029
      if (trigger === "update" && session) {
        return {
          ...token,
          loginUser: session.loginUser,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      session.loginUser = token.loginUser;
      return session;
    },
    async signIn({ user }) {
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      // credentials: {
      //   phone: { label: "Phone", type: "text" },
      //   code: { label: "Code", type: "text" }
      // },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        const schema = z.object({
          phone: z.string(),
          password: z.string(),
        });
        const parcedCreds = schema.safeParse(credentials);
        if (parcedCreds.success) {
          const { phone, password } = parcedCreds.data;
          try {
            const user = await verifyPhoneNumber(phone, password);
            if (!user) return null;
            return { loginUser: user };
          } catch (error) {
            println("error", error);
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
