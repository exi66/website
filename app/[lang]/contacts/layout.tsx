import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { getDictionary, LangProps } from "@/lib/dictionaries";

export async function generateMetadata(params: LangProps): Promise<Metadata> {
  const { lang } = await params.params;
  const dict = await getDictionary(lang);
  return {
    title: dict.navbar.links.contacts,
    metadataBase: new URL("https://me.exi.moe/"),
    description: dict.metadata.description,
  };
}

export default function ContactsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-start justify-center w-full mx-auto">
      {children}
      <Toaster />
    </div>
  );
}
