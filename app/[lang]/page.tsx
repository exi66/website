import LocalizedLink from "@/components/localized-link";
import { Button } from "@/components/ui/button";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import { page_routes } from "@/lib/routes-config";
import { Pen, User, ExternalLink, MessageCircleReply } from "lucide-react";
import { TechBox } from "@/components/box3d";
import type { Metadata } from "next";

export async function generateMetadata(params: LangProps): Promise<Metadata> {
  const { lang } = await params.params;
  const dict = await getDictionary(lang);
  return {
    title: dict.home.name,
    metadataBase: new URL("https://me.exi.moe/"),
    description: dict.metadata.description,
  };
}

export default async function Home({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex sm:min-h-[85.5vh] min-h-[85vh] flex-col items-start justify-center px-2 sm:py-8 py-12 space-y-6">
        <div className="flex flex-row">
          <TechBox />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-4">
              {dict.home.main_header}{" "}
              <span className="block text-2xl">
                {dict.home.sub_header}{" "}
                <span className="text-primary">{dict.home.work_position}</span>
              </span>
            </h1>
            <div className="flex flex-row space-x-4">
              <Button asChild className="text-xl">
                <a href="https://github.com/exi66" target="_blank">
                  Github <ExternalLink size={16} className="ml-1" />
                </a>
              </Button>
              <Button asChild className="text-xl">
                <a href="https://t.me/exi666" target="_blank">
                  Telegram <ExternalLink size={16} className="ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <p>
            {dict.home.about_website}{" "}
            <Button
              asChild
              variant="link"
              className="px-0 h-auto text-base py-0"
            >
              <a href="https://github.com/nisabmohd/Aria-Docs" target="_blank">
                aria-docs
              </a>
            </Button>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6 w-full">
          <LocalizedLink
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href={`/resume${page_routes[0].href}`}
          >
            <User size={32} />
            <span>
              {dict.navbar.links.summary}{" "}
              <span className="block text-sm text-muted-foreground">
                {dict.home.summary_desc}
              </span>
            </span>
          </LocalizedLink>
          <LocalizedLink
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/blog"
          >
            <Pen size={32} />
            <span>
              {dict.navbar.links.blog}{" "}
              <span className="block text-sm text-muted-foreground">
                {dict.home.blog_desc}
              </span>
            </span>
          </LocalizedLink>
          <LocalizedLink
            className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            href="/contacts"
          >
            <MessageCircleReply size={32} />
            <span>
              {dict.navbar.links.contacts}{" "}
              <span className="block text-sm text-muted-foreground">
                {dict.home.contacts_desc}
              </span>
            </span>
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
