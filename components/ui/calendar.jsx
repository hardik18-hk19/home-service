"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "/lib/utils";
import { buttonVariants } from "/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 rounded-lg border shadow-sm", className)}
      classNames={{
        months: "flex flex-col items-center",
        month: "space-y-4 text-xl font-semibold",
        caption: "flex justify-between items-center py-2 px-4 bg-white rounded-t-lg",
        caption_label: "text-base font-medium",
        nav: "flex items-center space-x-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 opacity-75 hover:opacity-100"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-muted-foreground w-9 font-normal text-xs text-center",
        row: "flex w-full",
        cell: "h-9 w-9 text-center text-sm p-0 relative border",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-gray-200 text-primary-foreground hover:bg-gray-300 focus:bg-gray-300 rounded-md",
        day_today: "font-bold text-primary",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "bg-accent text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5 items-start" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5 items-end" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
