'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useDictionary } from './contexts/dictionary-provider';

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dict = useDictionary();
  const label = dict.navbar.theme.toggle;

  // Both icons are rendered and switched by the `dark` class, so the server and client markup match.
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      title={label}
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}
