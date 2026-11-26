import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/contexts/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getDictionary, LangProps } from '@/lib/dictionaries';
import { ClientDictionary } from '@/components/contexts/dictionary-provider';
import { locales, Locale } from '@/lib/locale';
import '../globals.css';

export async function generateMetadata(params: LangProps): Promise<Metadata> {
  const { lang } = await params.params;
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.title,
    metadataBase: new URL('https://me.exi.moe/'),
    description: dict.metadata.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ClientDictionary dict={dict}>
          <ThemeProvider>
            <Navbar dict={dict} />
            <main className="mx-auto h-auto w-[90vw] scroll-smooth sm:container">{children}</main>
            <Footer dict={dict} />
          </ThemeProvider>
        </ClientDictionary>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}
