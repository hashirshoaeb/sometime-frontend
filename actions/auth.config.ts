import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "wa-otp-login",
      name: "WA OTP Login",
      // credentials: {
      //   phone: { label: "Phone", type: "text" },
      //   code: { label: "Code", type: "text" }
      // },
      async authorize(credentials, req) {
        const { phone, code } = credentials;
        return null;
      },
    }),
  ],
});
