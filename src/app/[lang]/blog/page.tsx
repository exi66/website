import type { Metadata } from 'next';
import LocalizedLink from '@/components/localized-link';
import { getDictionary, LangProps } from '@/lib/dictionaries';
import { Author, BlogMdxFrontmatter, getAllBlogs } from '@/lib/markdown';
import { stringToDate } from '@/lib/utils';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar';
import { Time } from '@/components/time';

export async function generateMetadata(params: LangProps): Promise<Metadata> {
  const { lang } = await params.params;
  const dict = await getDictionary(lang);
  return {
    title: dict.navbar.links.blog,
    description: dict.metadata.description,
  };
}

export default async function BlogIndexPage({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const blogs = (await getAllBlogs(lang)).sort(
    (a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime(),
  );
  return (
    <div className="mx-auto flex w-full flex-col gap-1 pt-10">
      <div className="mb-7 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{dict.blog.title}</h1>
        <p className="text-muted-foreground">{dict.blog.sub_title}</p>
      </div>
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard {...blog} slug={blog.slug} key={blog.slug} locale={lang} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  date,
  title,
  description,
  slug,
  cover,
  authors,
  locale,
}: BlogMdxFrontmatter & { slug: string; locale: string }) {
  return (
    <LocalizedLink
      href={`/blog/${slug}`}
      className="flex min-h-[400px] flex-col items-start gap-2 rounded-md border px-3 py-4"
    >
      <h3 className="text-md -mt-1 pr-7 font-semibold">{title}</h3>
      <div className="w-full">
        <Image
          src={cover}
          alt={title}
          width={400}
          height={150}
          quality={80}
          className="h-[180px] w-full rounded-md border object-cover"
        />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <div className="mt-auto flex w-full items-center justify-between">
        <Time variant="short" date={stringToDate(date)} locale={locale} className="text-[13px] text-muted-foreground" />
        <Authors users={authors} />
      </div>
    </LocalizedLink>
  );
}

function Authors({ users, max = 4 }: { users: Author[]; max?: number }) {
  const remaining = Math.max(users.length - max, 0);

  return (
    <AvatarGroup>
      {users.slice(0, max).map((user) => (
        <Avatar key={user.username}>
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && <AvatarGroupCount>+{remaining}</AvatarGroupCount>}
    </AvatarGroup>
  );
}
