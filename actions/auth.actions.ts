"use server";
import println from "@/utils/print";
import { signIn } from "./auth.config";
import { AuthError } from "next-auth";
import { Exception } from "@/utils/exceptions";

export const authenticate = async (data: { phone: string; otp: string }) => {
  try {
    const res = await signIn("credentials", {
      phone: data.phone,
      password: data.otp,
      redirect: false,
    });

    println("login successfull", res);
  } catch (error) {
    if (error instanceof AuthError) {
      return error.cause?.err?.message;
    }
    console.error("Error during form submission:", error);
    throw error;
  }
  return undefined;
};
