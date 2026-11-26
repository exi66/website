import { getPreviousNext } from '@/lib/markdown';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { buttonVariants } from './ui/button';
import LocalizedLink from './localized-link';
import { Dictionary } from '@/lib/dictionaries';

export default function Pagination({ pathname, dict }: { pathname: string; dict: Dictionary }) {
  const res = getPreviousNext(pathname);

  return (
    <div className="grid flex-grow grid-cols-2 gap-3 py-7 sm:py-10">
      <div>
        {res.prev && (
          <LocalizedLink
            className={buttonVariants({
              variant: 'outline',
              className: 'flex w-full flex-col !items-start !py-8 pl-3 no-underline',
            })}
            href={`/resume${res.prev.href}`}
          >
            <span className="flex items-center text-xs text-muted-foreground">
              <ChevronLeftIcon className="mr-1 h-[1rem] w-[1rem]" />
              {dict.docs.previous}
            </span>
            <span className="mt-1 ml-1">{dict.leftbar[res.prev.title as keyof typeof dict.leftbar]}</span>
          </LocalizedLink>
        )}
      </div>
      <div>
        {res.next && (
          <LocalizedLink
            className={buttonVariants({
              variant: 'outline',
              className: 'flex w-full flex-col !items-end !py-8 pr-3 no-underline',
            })}
            href={`/resume${res.next.href}`}
          >
            <span className="flex items-center text-xs text-muted-foreground">
              {dict.docs.next}
              <ChevronRightIcon className="ml-1 h-[1rem] w-[1rem]" />
            </span>
            <span className="mt-1 mr-1">{dict.leftbar[res.next.title as keyof typeof dict.leftbar]}</span>
          </LocalizedLink>
        )}
      </div>
    </div>
  );
}
