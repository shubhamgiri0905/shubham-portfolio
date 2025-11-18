"use client";

import { ThemeProvider as NextThemes } from "next-themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="class"      // applies class="light" or class="dark"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </NextThemes>
  );
}
