import { Typography } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import { Author, getAllBlogStaticPaths, getBlogForSlug } from '@/lib/markdown';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { stringToDate } from '@/lib/utils';
import Image from 'next/image';
import { getDictionary, LangProps } from '@/lib/dictionaries';
import LocalizedLink from '@/components/localized-link';
import { Time } from '@/components/time';
import { Locale } from '@/lib/locale';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps & LangProps) {
  const params = await props.params;

  const { slug, lang } = params;

  const res = await getBlogForSlug(slug, lang);
  if (!res) return {};
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export async function generateStaticParams({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Locale;
  const val = await getAllBlogStaticPaths(lang);
  if (!val) return [];
  return val.map((it) => ({ slug: it }));
}

export default async function BlogPage(props: PageProps & LangProps) {
  const params = await props.params;

  const { slug, lang } = params;

  const res = await getBlogForSlug(slug, lang);
  const dict = await getDictionary(lang);

  if (!res) notFound();
  return (
    <div className="sm:[95%] md:[75%] mx-auto lg:w-[60%]">
      <LocalizedLink
        className={buttonVariants({
          variant: 'link',
          className: 'mx-0! mb-7 -ml-1! px-0!',
        })}
        href="/blog"
      >
        <ArrowLeftIcon className="mr-1.5 h-4 w-4" /> {dict.blog.back_to_blog}
      </LocalizedLink>
      <div className="mb-2 flex w-full flex-col gap-3 pb-7">
        <Time
          variant="long"
          date={stringToDate(res.frontmatter.date)}
          locale={lang}
          className="text-sm text-muted-foreground"
        />
        <h1 className="text-3xl font-extrabold sm:text-4xl">{res.frontmatter.title}</h1>
        <div className="mt-6 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{dict.blog.posted_by}</p>
          <Authors authors={res.frontmatter.authors} />
        </div>
      </div>
      <div className="!w-full">
        <div className="mb-7 w-full">
          <Image
            src={res.frontmatter.cover}
            alt="cover"
            width={700}
            height={400}
            className="h-[400px] w-full rounded-md border object-cover"
          />
        </div>
        <Typography>{res.content}</Typography>
      </div>
    </div>
  );
}

function Authors({ authors }: { authors: Author[] }) {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {authors.map((author) => {
        return (
          <Link href={author.handleUrl} className="flex items-center gap-2" key={author.username}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="text-sm font-medium">{author.username}</p>
              <p className="font-mono text-[13px] text-muted-foreground">@{author.handle}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
