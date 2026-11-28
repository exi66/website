'use client';

import { useDictionary } from '@/components/contexts/dictionary-provider';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const dict = useDictionary();

  return (
    <div className="my-auto flex flex-col items-center gap-4 px-2">
      <div className="flex w-fit flex-col items-center justify-center gap-2 text-center">
        <h2 className="pr-1 text-7xl font-bold">{dict.not_found['404']}</h2>
        <p className="text-md font-medium text-muted-foreground">
          {dict.not_found.page_not_found} {':('}
        </p>
        <p> {dict.not_found.sub_text}</p>
      </div>
      <Link href="/" className={buttonVariants({})}>
        {dict.not_found.back_to_homepage}
      </Link>
    </div>
  );
}
