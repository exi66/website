"use client";

import NextLink from "next/link";
import { ComponentProps } from "react";
import useLocale from "@/components/hooks/useLocale";

export default function Link({ href, ...props }: ComponentProps<"a">) {
  const locale = useLocale();
  if (!href) return null;

  const value = href.toString();

  // External links open in a new tab.
  if (value.startsWith("http")) {
    return (
      <NextLink
        href={href}
        {...props}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }

  // Internal absolute links are prefixed with the current locale.
  const localizedHref = value.startsWith("/") ? `/${locale}${value}` : href;
  return <NextLink href={localizedHref} {...props} />;
}
