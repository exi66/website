'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileIcon, SearchIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { buttonVariants } from '@/components/ui/button';
import { advanceSearch, cn } from '@/lib/utils';
import { Dictionary } from '@/lib/dictionaries';
import { usePathname } from 'next/navigation';
import LocalizedLink from './localized-link';

export default function Search({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const [searchedInput, setSearchedInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // A search result was chosen: close the dialog.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setIsOpen(false);
  }

  const filteredResults = useMemo(() => advanceSearch(searchedInput.trim(), dict), [searchedInput, dict]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setSearchedInput('');
        setIsOpen(open);
      }}
    >
      <DialogTrigger
        aria-label={dict.navbar.search.search_documentation}
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'w-9 px-0 text-muted-foreground normal-case sm:w-56 sm:justify-start sm:px-3',
        )}
      >
        <SearchIcon className="size-4" />
        <span className="hidden truncate font-normal tracking-normal sm:inline">
          {dict.navbar.search.search_documentation}
        </span>
        <kbd className="ml-auto hidden bg-muted px-1.5 text-[10px] sm:inline">Ctrl K</kbd>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="top-[45%] max-w-162.5 gap-0 p-0 sm:top-[38%]">
        <DialogHeader className="gap-0">
          <DialogTitle className="sr-only">{dict.navbar.search.search_documentation}</DialogTitle>
          <div className="border-b border-border px-6">
            <input
              value={searchedInput}
              onChange={(e) => setSearchedInput(e.target.value)}
              placeholder={dict.navbar.search.type_something}
              autoFocus
              className="h-14 w-full border-0 bg-transparent p-0 outline-none"
            />
          </div>
        </DialogHeader>
        {filteredResults.length == 0 && searchedInput && (
          <p className="mx-auto mt-2 text-sm text-muted-foreground">
            {dict.navbar.search.no_results_found} <span className="text-foreground">{`"${searchedInput}"`}</span>
          </p>
        )}
        <ScrollArea className="max-h-100 overflow-y-auto">
          <div className="flex flex-col items-start overflow-y-auto px-1 pb-4 sm:px-2">
            {filteredResults.map((item) => {
              const level = (item.href.split('/').slice(1).length - 1) as keyof typeof paddingMap;
              const paddingClass = paddingMap[level];
              const Icon = item.icon ?? FileIcon;

              return (
                <LocalizedLink
                  key={item.href}
                  className={cn('flex w-full items-center gap-2.5 text-sm hover:bg-accent', paddingClass)}
                  href={`/resume${item.href}`}
                >
                  <div className={cn('flex h-full w-fit items-center gap-1.5 px-2 py-3', level > 1 && 'border-l pl-4')}>
                    <Icon className="mr-1 size-4" />
                    {dict.leftbar[item.title as keyof typeof dict.leftbar]}
                  </div>
                </LocalizedLink>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

const paddingMap = {
  1: 'pl-2',
  2: 'pl-4',
  3: 'pl-10',
  // Add more levels if needed
} as const;
