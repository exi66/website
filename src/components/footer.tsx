import Link from 'next/link';
import Image from 'next/image';
import { Dictionary } from '@/lib/dictionaries';
import Moe from '@/assets/brand/logo-stacked.svg';

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="h-16 w-full border-t">
      <div className="container flex h-full flex-wrap items-center justify-center gap-4 py-3 text-sm text-muted-foreground max-sm:px-4 sm:justify-between sm:gap-0 sm:py-0">
        <div className="flex items-center gap-3">
          <Image src={Moe} alt="favicon" width="0" height="0" sizes="100vw" className="h-auto w-8" />
          <p className="text-center">
            {dict.footer.built_by}{' '}
            <Link className="px-0 underline underline-offset-2" href="https://github.com/exi66">
              exi66
            </Link>
            . {dict.footer.source_code_available}{' '}
            <Link className="px-0 underline underline-offset-2" href="https://github.com/exi66/website">
              GitHub
            </Link>
            .
          </p>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return <>&copy; {new Date().getFullYear()}</>;
}
