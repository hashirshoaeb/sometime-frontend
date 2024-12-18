import { LoginUser } from "./ResponseTypes"
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
  interface User {
    loginUser?: LoginUser
  }
  interface Session {
    loginUser?: LoginUser
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    loginUser?: LoginUser
  }
}