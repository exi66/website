'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AlignLeftIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dictionary } from '@/lib/dictionaries';
import { Logo, NavMenu } from './navbar';
import DocsMenu from './docs-menu';

export function Leftbar() {
  return (
    <aside className="sticky top-16 hidden min-w-59.5 flex-[1.5] flex-col md:flex">
      <ScrollArea className="py-4">
        <DocsMenu />
      </ScrollArea>
    </aside>
  );
}

export function SheetLeftbar({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu after navigating to a page from it.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Menu" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}>
        <AlignLeftIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="px-5">
            <Logo />
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="mx-2 mt-3 flex flex-col gap-2.5 px-5">
            <NavMenu dict={dict} />
          </div>
          <div className="mx-2 px-5">
            <DocsMenu />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
