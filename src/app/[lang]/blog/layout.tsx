import { PropsWithChildren } from 'react';

export default function BlogLayout({ children }: PropsWithChildren) {
  return <div className="mx-auto flex w-full flex-col items-start justify-center">{children}</div>;
}
