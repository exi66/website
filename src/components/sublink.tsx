'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { EachRoute } from '@/lib/routes-config';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import LocalizedLink from './localized-link';
import { useDictionary } from './contexts/dictionary-provider';

export default function SubLink({ title, href, items, noLink, level }: EachRoute & { level: number }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(level == 0 || path.includes(href));
  const [seenPath, setSeenPath] = useState(path);
  const dict = useDictionary();
  const label = dict.leftbar[title as keyof typeof dict.leftbar];

  // Opens the section when navigation enters it.
  if (seenPath !== path) {
    setSeenPath(path);
    if (path.includes(href)) setIsOpen(true);
  }

  const titleOrLink = !noLink ? (
    <LocalizedLink activeClassName="text-foreground dark:font-medium font-semibold" href={href}>
      {label}
    </LocalizedLink>
  ) : (
    <h4 className="font-medium text-foreground sm:text-sm">{label}</h4>
  );

  if (!items) {
    return <div className="flex flex-col">{titleOrLink}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex w-full items-center justify-between pr-5">
          {titleOrLink}
          <CollapsibleTrigger aria-label={label} className="p-1">
            {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div
            className={cn(
              'mt-2.5 ml-0.5 flex flex-col items-start gap-3 text-muted-foreground sm:text-sm',
              level > 0 && 'ml-1.5 border-l pl-4',
            )}
          >
            {items.map((innerLink) => (
              <SubLink key={href + innerLink.href} {...innerLink} href={href + innerLink.href} level={level + 1} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
