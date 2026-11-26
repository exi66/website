'use client';

import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes-config';
import SubLink from './sublink';

export default function DocsMenu() {
  const pathname = usePathname();
  if (!/^\/[a-z]{2}\/resume/.test(pathname)) return null;

  return (
    <div className="mt-5 flex flex-col gap-3.5 pr-2 pb-6">
      {ROUTES.map((item, index) => (
        <SubLink key={item.title + index} {...item} href={`/resume${item.href}`} level={0} />
      ))}
    </div>
  );
}
