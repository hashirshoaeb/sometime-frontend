"use client";

import { AuthFlowProvider } from "@/components/signup/Signup";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthFlowProvider>{children}</AuthFlowProvider>
    </NextUIProvider>
  );
}
