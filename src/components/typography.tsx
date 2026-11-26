import { PropsWithChildren } from 'react';

export function Typography({ children }: PropsWithChildren) {
  return (
    <div className="prose w-[85vw] max-w-[500px]! min-w-full! pt-2 prose-zinc sm:mx-auto sm:w-full dark:prose-invert prose-headings:scroll-m-20 prose-h2:my-4 prose-h2:mt-8 prose-code:overflow-x-auto prose-code:rounded-md prose-code:border prose-code:bg-muted/80 prose-code:p-[0.085rem] prose-code:px-1.5 prose-code:font-mono prose-code:text-sm prose-code:leading-6 prose-code:font-normal prose-code:text-muted-foreground prose-code:before:content-none prose-code:after:content-none dark:prose-code:text-white prose-pre:bg-background prose-img:my-3 prose-img:rounded-md prose-img:border">
      {children}
    </div>
  );
}
