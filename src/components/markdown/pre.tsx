import { ComponentProps } from 'react';
import Copy from './copy';

export default function Pre({ children, raw, ...rest }: ComponentProps<'pre'> & { raw?: string }) {
  return (
    <div className="group relative my-5">
      <div className="absolute top-3 right-2.5 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Copy content={raw!} />
      </div>
      <div className="relative">
        <pre {...rest}>{children}</pre>
      </div>
    </div>
  );
}
