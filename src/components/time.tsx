import { cn } from '@/lib/utils';

const FORMATS = {
  short: { month: 'short', day: 'numeric', year: 'numeric' },
  long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>;

export function Time({
  date,
  variant = 'short',
  locale,
  className,
}: {
  date: Date;
  variant?: keyof typeof FORMATS;
  locale?: string;
  className?: string;
}) {
  return (
    <time className={cn(className)} dateTime={date.toISOString()}>
      {date.toLocaleDateString(locale, FORMATS[variant])}
    </time>
  );
}
