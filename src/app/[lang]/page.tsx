import LocalizedLink from '@/components/localized-link';
import { buttonVariants } from '@/components/ui/button';
import { getDictionary, LangProps } from '@/lib/dictionaries';
import { page_routes } from '@/lib/routes-config';
import { Pen, User, ExternalLink, MessageCircleReply } from 'lucide-react';
import { TechBox } from '@/components/box3d';
import type { Metadata } from 'next';

const socialLinks = [
  { title: 'Github', href: 'https://github.com/exi66' },
  { title: 'Telegram', href: 'https://t.me/exi666' },
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
      href: '/blog',
      Icon: Pen,
      title: dict.navbar.links.blog,
      description: dict.home.blog_desc,
    },
    {
      href: '/contacts',
      Icon: MessageCircleReply,
      title: dict.navbar.links.contacts,
      description: dict.home.contacts_desc,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex min-h-[85vh] flex-col items-start justify-center space-y-6 px-2 py-12 sm:min-h-[85.5vh] sm:py-8">
        <div className="flex flex-row">
          {/* <TechBox /> */}
          <div className="flex flex-col">
            <h1 className="mb-4 text-4xl font-bold">
              {dict.home.main_header}{' '}
              <span className="block text-2xl">
                {dict.home.sub_header}{' '}
                <span className="inline-block text-brand-gradient">{dict.home.work_position}</span>
              </span>
            </h1>
            <div className="flex flex-row space-x-4">
              {socialLinks.map(({ title, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ className: 'text-base' })}
                >
                  {title} <ExternalLink size={16} className="ml-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <p>
            {dict.home.about_website}{' '}
            <a
              href="https://github.com/nisabmohd/Aria-Docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              aria-docs
            </a>
          </p>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-3">
          {sections.map(({ href, Icon, title, description }) => (
            <LocalizedLink
              key={href}
              className="flex h-48 flex-col justify-between rounded-lg border bg-card p-4 text-card-foreground transition-all hover:scale-[1.02]"
              href={href}
            >
              <Icon size={32} />
              <span>
                {title} <span className="block text-sm text-muted-foreground">{description}</span>
              </span>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </div>
  );
}
