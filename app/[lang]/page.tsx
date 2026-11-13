import LocalizedLink from "@/components/localized-link";
import { Button } from "@/components/ui/button";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import { page_routes } from "@/lib/routes-config";
import { Pen, User, ExternalLink, MessageCircleReply } from "lucide-react";
import { TechBox } from "@/components/box3d";
import type { Metadata } from "next";

const socialLinks = [
  { title: "Github", href: "https://github.com/exi66" },
  { title: "Telegram", href: "https://t.me/exi666" },
];

export async function generateMetadata(params: LangProps): Promise<Metadata> {
  const { lang } = await params.params;
  const dict = await getDictionary(lang);
  return {
    title: dict.home.name,
    description: dict.metadata.description,
  };
}

export default async function Home({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const sections = [
    {
      href: `/resume${page_routes[0].href}`,
      Icon: User,
      title: dict.navbar.links.summary,
      description: dict.home.summary_desc,
    },
    {
      href: "/blog",
      Icon: Pen,
      title: dict.navbar.links.blog,
      description: dict.home.blog_desc,
    },
    {
      href: "/contacts",
      Icon: MessageCircleReply,
      title: dict.navbar.links.contacts,
      description: dict.home.contacts_desc,
    },
  ];

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
              {socialLinks.map(({ title, href }) => (
                <Button key={href} asChild className="text-xl">
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {title} <ExternalLink size={16} className="ml-1" />
                  </a>
                </Button>
              ))}
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
              <a
                href="https://github.com/nisabmohd/Aria-Docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                aria-docs
              </a>
            </Button>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6 w-full">
          {sections.map(({ href, Icon, title, description }) => (
            <LocalizedLink
              key={href}
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
              href={href}
            >
              <Icon size={32} />
              <span>
                {title}{" "}
                <span className="block text-sm text-muted-foreground">
                  {description}
                </span>
              </span>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </div>
  );
}
