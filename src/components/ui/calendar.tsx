"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string;
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function Calendar({
  className,
  selected,
  onSelect,
  minDate,
  maxDate,
  disabledDates,
}: CalendarProps) {
  const today = React.useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    return selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [slideDirection, setSlideDirection] = React.useState<number>(0);

  const prevMonth = () => {
    setSlideDirection(-1);
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSlideDirection(1);
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const isForward = today > currentMonth;
    setSlideDirection(isForward ? 1 : -1);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    if (onSelect) onSelect(today);
  };

  // Generate grid matrix for current month (6 weeks x 7 days)
  const calendarDays = React.useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }> = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isSelected: !!selected && isSameDay(date, selected),
        isDisabled:
          (minDate ? date < minDate : false) ||
          (maxDate ? date > maxDate : false) ||
          (disabledDates ? disabledDates(date) : false),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        isSelected: !!selected && isSameDay(date, selected),
        isDisabled:
          (minDate ? date < minDate : false) ||
          (maxDate ? date > maxDate : false) ||
          (disabledDates ? disabledDates(date) : false),
      });
    }

    // Next month padding days to complete 35 or 42 cells
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isSelected: !!selected && isSameDay(date, selected),
        isDisabled:
          (minDate ? date < minDate : false) ||
          (maxDate ? date > maxDate : false) ||
          (disabledDates ? disabledDates(date) : false),
      });
    }

    return days;
  }, [currentMonth, today, selected, minDate, maxDate, disabledDates]);

  return (
    <div
      role="region"
      aria-label="Calendar date picker"
      className={cn(
        "p-3.5 select-none w-72 max-w-full rounded-2xl border border-border/80 bg-card text-card-foreground shadow-lg glass-thin specular-rim",
        className
      )}
    >
      {/* Month & Navigation Header */}
      <div className="flex items-center justify-between gap-1 mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-xs tracking-tight text-foreground">
            {MONTH_NAMES[currentMonth.getMonth()]}
          </span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {currentMonth.getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <Button
            size="xs"
            variant="ghost"
            onClick={goToToday}
            className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-foreground font-medium rounded-md"
            aria-label="Go to today"
          >
            Today
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={prevMonth}
            aria-label="Previous month"
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground active:scale-95"
          >
            <ChevronLeftIcon size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={nextMonth}
            aria-label="Next month"
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground active:scale-95"
          >
            <ChevronRightIcon size={14} />
          </Button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="text-[11px] font-medium text-muted-foreground/80 py-1"
            aria-label={name}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Date Grid with AnimatePresence Month Slide */}
      <div className="relative overflow-hidden min-h-[216px]">
        <AnimatePresence initial={false} custom={slideDirection} mode="wait">
          <motion.div
            key={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
            custom={slideDirection}
            initial={{ opacity: 0, x: slideDirection * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection * -20 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 35,
              mass: 0.8,
            }}
            className="grid grid-cols-7 gap-1"
          >
            {calendarDays.map(({ date, isCurrentMonth, isToday, isSelected, isDisabled }) => {
              const dayNumber = date.getDate();
              const dateString = date.toISOString().split("T")[0];

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onSelect?.(date)}
                  aria-label={`${date.toDateString()}${isSelected ? ", selected" : ""}${isToday ? ", today" : ""}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative size-8 text-xs font-mono font-medium tabular-nums rounded-lg flex items-center justify-center transition-all duration-150 border border-transparent cursor-pointer",
                    // Current month vs outside month
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground/40",
                    // Hover & Focus (zero layout shift)
                    !isSelected && !isDisabled && "hover:bg-muted/70 hover:text-foreground active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    // Today outline indicator
                    isToday && !isSelected && "border-primary/40 text-primary",
                    // Selected state
                    isSelected &&
                      "bg-primary text-primary-foreground shadow-xs specular-rim hover:bg-primary/95",
                    // Disabled
                    isDisabled && "opacity-25 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <span>{dayNumber}</span>
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export interface DatePickerProps {
  className?: string;
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePicker({
  className,
  selected,
  onSelect,
  placeholder = "Select date...",
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formattedDate = React.useMemo(() => {
    if (!selected) return null;
    return selected.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={cn(
              "w-56 justify-start text-left font-normal gap-2 h-9 px-3 rounded-lg border-border/80 glass-thin",
              !selected && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <CalendarDaysIcon size={15} className="text-muted-foreground shrink-0" />
        <span className="truncate tabular-nums text-xs">
          {formattedDate || placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="p-0 border-0 shadow-2xl w-auto overflow-hidden rounded-2xl glass-thick specular-rim"
      >
        <Calendar
          selected={selected}
          onSelect={(date) => {
            onSelect?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
