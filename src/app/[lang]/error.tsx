'use client'; // Error components must be Client Components

import { useDictionary } from '@/components/contexts/dictionary-provider';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const dict = useDictionary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="my-auto flex flex-col items-center gap-4 px-2">
      <div className="flex w-fit flex-col items-center justify-center gap-2 text-center">
        <h2 className="pr-1 text-7xl font-bold">{dict.error.oops}</h2>
        <p className="text-md font-medium text-muted-foreground">
          {dict.error.something_went_wrong} {':`('}
        </p>
        <p>{dict.error.sub_text}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          {dict.error.reload_page}
        </Button>
        <Link href="/" className={buttonVariants({})}>
          {dict.error.back_to_homepage}
        </Link>
      </div>
    </div>
  );
}
