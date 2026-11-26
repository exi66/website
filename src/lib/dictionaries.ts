import { cache } from 'react';
import { Locale, locales } from './locale';

export type LangProps = { params: Promise<{ lang: Locale }> };

const dictionaries = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  ru: () => import('@/messages/ru.json').then((module) => module.default),
};

const getDictionaryUncached = async (locale: Locale) => {
  if (Object.hasOwn(dictionaries, locale)) return dictionaries[locale]();
  else return dictionaries[locales[0]]();
};

export const getDictionary = cache(getDictionaryUncached);

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
