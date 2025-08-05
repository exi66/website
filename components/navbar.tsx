import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Search from "./search";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import LangSelect from "./lang-select";
import { Dictionary } from "@/lib/dictionaries";
import LocalizedLink from "./localized-link";
import Moe from "@/app/moe.svg";

export const NAVLINKS = [
  {
    title: "summary",
    href: `/resume${page_routes[0].href}`,
    absolute: true,
  },
  {
    title: "blog",
    href: "/blog",
  },
  {
    title: "contacts",
    href: "/contacts",
  },
];

export function Navbar({ dict }: { dict: Dictionary }) {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar dict={dict} />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu dict={dict} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search dict={dict} />
            <div className="flex ml-2.5 sm:ml-0">
              <LangSelect />
              <ModeToggle dict={dict} />
            </div>
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
        className="hover:-rotate-6 transition-transform h-6 w-auto"
      />
    </LocalizedLink>
  );
}

export function NavMenu({
  isSheet = false,
  dict,
}: {
  isSheet?: boolean;
  dict: Dictionary;
}) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <LocalizedLink
            key={item.title + item.href}
            className="flex items-center gap-1 text-muted-foreground"
            activeClassName="text-primary dark:font-medium font-semibold"
            href={item.href}
            absolute={item.absolute}
          >
            {dict.navbar.links[item.title as keyof typeof dict.navbar.links]}
          </LocalizedLink>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
