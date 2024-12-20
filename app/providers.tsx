"use client";

import { AuthFlowProvider } from "@/components/signup/Signup";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <AuthFlowProvider>{children}</AuthFlowProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
