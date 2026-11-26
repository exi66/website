import { PropsWithChildren } from 'react';

export default function BlogLayout({ children }: PropsWithChildren) {
  return <div className="mx-auto flex w-full flex-col items-start justify-center pt-8 pb-10">{children}</div>;
}
