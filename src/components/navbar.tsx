import { ModeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import Search from './search';
import { SheetLeftbar } from './leftbar';
import { page_routes } from '@/lib/routes-config';
import LangSelect from './lang-select';
import { Dictionary } from '@/lib/dictionaries';
import LocalizedLink from './localized-link';
import Moe from '@/assets/brand/logo.svg';

export const NAVLINKS = [
  {
    title: 'summary',
    href: `/resume${page_routes[0].href}`,
    absolute: true,
  },
  {
    title: 'blog',
    href: '/blog',
  },
  {
    title: 'contacts',
    href: '/contacts',
  },
];

export function Navbar({ dict }: { dict: Dictionary }) {
  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b bg-card">
      <div className="mx-auto flex h-full w-[95vw] items-center justify-between sm:container md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar dict={dict} />
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex">
              <Logo />
            </div>
            <div className="hidden items-center gap-4 text-sm font-medium text-muted-foreground lg:flex">
              <NavMenu dict={dict} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Search dict={dict} />
          <div className="flex">
            <LangSelect />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <LocalizedLink href="/" className="flex items-center gap-2.5">
      <Image
        src={Moe}
        alt="exi.moe"
        width="0"
        height="0"
        sizes="100vw"
        className="h-6 w-auto transition-transform hover:-rotate-6"
      />
    </LocalizedLink>
  );
}

export function NavMenu({ dict }: { dict: Dictionary }) {
  return (
    <>
      {NAVLINKS.map((item) => (
        <LocalizedLink
          key={item.title + item.href}
          className="flex items-center gap-1 text-muted-foreground"
          activeClassName="text-foreground dark:font-medium font-semibold"
          href={item.href}
          absolute={item.absolute}
        >
          {dict.navbar.links[item.title as keyof typeof dict.navbar.links]}
        </LocalizedLink>
      ))}
    </>
  );
}
