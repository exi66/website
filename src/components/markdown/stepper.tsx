import { cn } from '@/lib/utils';
import { Children, PropsWithChildren } from 'react';

export function Stepper({ children }: PropsWithChildren) {
  const length = Children.count(children);

  return (
    <div className="flex flex-col">
      {Children.map(children, (child, index) => {
        return (
          <div className={cn('relative ml-3 border-l pl-9', index < length - 1 && 'pb-5')}>
            <div className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-md border bg-muted text-xs font-medium">
              {index + 1}
            </div>
            {child}
          </div>
        );
      })}
    </div>
  );
}

export function StepperItem({ children, title }: PropsWithChildren & { title?: string }) {
  return (
    <div className="pt-0.5">
      <h4 className="mt-0">{title}</h4>
      <div>{children}</div>
    </div>
  );
}
