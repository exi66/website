import Link from "next/link";
import Image from "next/image";
import { Dictionary } from "@/lib/dictionaries";
import Moe from "@/app/moe2.svg";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <Image
            src={Moe}
            alt="favicon"
            width="0"
            height="0"
            sizes="100vw"
            className="w-8 h-auto"
          />
          <p className="text-center">
            {dict.footer.built_by}{" "}
            <Link
              className="px-0 underline underline-offset-2"
              href="https://github.com/exi66"
            >
              exi66
            </Link>
            . {dict.footer.source_code_available}{" "}
            <Link
              className="px-0 underline underline-offset-2"
              href="https://github.com/exi66/website"
            >
              GitHub
            </Link>
            .
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return <>&copy; {new Date().getFullYear()}</>;
}
