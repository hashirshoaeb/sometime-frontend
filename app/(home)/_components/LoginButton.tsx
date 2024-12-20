"use client";
import { useAuthFlow } from "@/components/signup/Signup";
import { useSession } from "next-auth/react";

export function LoginButton() {
  const { onOpen } = useAuthFlow();
  const session = useSession();
  const { data: sessionData, status, update } = session;
  console.log("sessionData", sessionData, status);

  if (status === "loading") {
    return <p>...</p>;
  } else if (status === "authenticated") {
    return <p>{sessionData.loginUser?.phone}</p>;
  } else {
    return (
      <button
        onClick={() => {
          console.log("Open Modal");
          onOpen();
        }}
        className=" bg-black text-white py-2 px-4 rounded-full"
      >
        Login
      </button>
    );
  }
}
