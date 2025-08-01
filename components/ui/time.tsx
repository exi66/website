"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type timeVariats = "short" | "long";

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export function formatDate2(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export interface TimeProps extends React.ButtonHTMLAttributes<HTMLTimeElement> {
  variant?: timeVariats;
  asChild?: boolean;
  date?: Date;
}

const Time = React.forwardRef<HTMLTimeElement, TimeProps>(
  (
    {
      className,
      variant = "short",
      date = new Date(),
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "time";
    return (
      <Comp
        className={cn("", className)}
        ref={ref}
        {...props}
        dateTime={date.toISOString()}
      >
        {variant == "long" ? formatDate(date) : formatDate2(date)}
      </Comp>
    );
  }
);
Time.displayName = "Time";

export { Time };
