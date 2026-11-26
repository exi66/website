'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { locales } from '@/lib/locale';
import { useDictionary } from './contexts/dictionary-provider';
import useLocale from './hooks/useLocale';

// Shared with the other projects on the domain (see src/lib/i18n.ts in the starter): the choice follows the user.
const STORAGE_KEY = 'i18nextLng';

export default function LangSelect() {
  const pathname = usePathname();
  const locale = useLocale();
  const dict = useDictionary();

  const next = locales[(locales.indexOf(locale as (typeof locales)[number]) + 1) % locales.length];

  function switchLocale() {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    // A full navigation: a soft one remounts the layout on the client, and next-themes then warns about its inline script.
    location.assign(pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${next}`));
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      title={dict.navbar.language}
      aria-label={dict.navbar.language}
      onClick={switchLocale}
    >
      {locale.toUpperCase()}
    </Button>
  );
}
