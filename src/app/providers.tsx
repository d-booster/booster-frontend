"use client";

import { NextUIProvider } from "@nextui-org/react";

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
