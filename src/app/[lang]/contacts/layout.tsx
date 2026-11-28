import { PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { getDictionary, LangProps } from '@/lib/dictionaries';

export async function generateMetadata(params: LangProps): Promise<Metadata> {
  const { lang } = await params.params;
  const dict = await getDictionary(lang);
  return {
    title: dict.navbar.links.contacts,
    description: dict.metadata.description,
  };
}

export default function ContactsLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full flex-col items-start justify-center">
      {children}
      <Toaster />
    </div>
  );
}
