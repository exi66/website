'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

// next-themes keeps the choice in localStorage `theme` (light | dark | system) and sets the class on <html>:
// the same key and values as the starter's ThemeProvider, so the theme is shared across projects on the domain.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
