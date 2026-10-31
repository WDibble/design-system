"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { springs } from "@/tokens/motion";
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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const monthVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? -32 : 32,
    opacity: 0,
  }),
};

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
    return selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [slideDirection, setSlideDirection] = React.useState<number>(0);

  const navigateMonth = (targetYear: number, targetMonth: number) => {
    const target = new Date(targetYear, targetMonth, 1);
    const targetNorm = target.getFullYear() * 12 + target.getMonth();
    const currentNorm = currentMonth.getFullYear() * 12 + currentMonth.getMonth();
    if (targetNorm === currentNorm) return;
    const dir = targetNorm > currentNorm ? 1 : -1;
    setSlideDirection(dir);
    setCurrentMonth(target);
  };

  const prevMonth = () => {
    navigateMonth(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
  };

  const nextMonth = () => {
    navigateMonth(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  };

  const prevYear = () => {
    navigateMonth(currentMonth.getFullYear() - 1, currentMonth.getMonth());
  };

  const nextYear = () => {
    navigateMonth(currentMonth.getFullYear() + 1, currentMonth.getMonth());
  };

  const goToToday = () => {
    navigateMonth(today.getFullYear(), today.getMonth());
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
        "glass-thin specular-rim w-72 max-w-full rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground shadow-lg select-none",
        className
      )}
    >
      {/* Month & Navigation Header */}
      <div className="mb-3 flex items-center justify-between gap-1 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold tracking-tight text-foreground">
            {MONTH_NAMES[currentMonth.getMonth()]}
          </span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {currentMonth.getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <Button
            size="icon-xs"
            variant="ghost"
            onClick={prevYear}
            aria-label="Previous year"
            className="size-6 rounded-md text-muted-foreground/70 hover:text-foreground"
            title="Previous year"
          >
            <ChevronsLeft size={13} />
          </Button>
          <Button
            size="icon-xs"
            variant="ghost"
            onClick={prevMonth}
            aria-label="Previous month"
            className="size-6 rounded-md text-muted-foreground hover:text-foreground"
            title="Previous month"
          >
            <ChevronLeftIcon size={13} />
          </Button>

          <Button
            size="xs"
            variant="ghost"
            onClick={goToToday}
            className="h-6 rounded-md px-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground"
            aria-label="Go to today"
          >
            Today
          </Button>

          <Button
            size="icon-xs"
            variant="ghost"
            onClick={nextMonth}
            aria-label="Next month"
            className="size-6 rounded-md text-muted-foreground hover:text-foreground"
            title="Next month"
          >
            <ChevronRightIcon size={13} />
          </Button>
          <Button
            size="icon-xs"
            variant="ghost"
            onClick={nextYear}
            aria-label="Next year"
            className="size-6 rounded-md text-muted-foreground/70 hover:text-foreground"
            title="Next year"
          >
            <ChevronsRight size={13} />
          </Button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-center">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="py-1 text-[11px] font-medium text-muted-foreground/80"
            aria-label={name}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Date Grid with AnimatePresence Month Slide */}
      <div className="relative min-h-56 overflow-hidden">
        <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
          <motion.div
            key={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
            custom={slideDirection}
            variants={monthVariants}
            initial="enter"
            animate="center"
            exit="exit"
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
                <motion.button
                  key={dateString}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    if (!isCurrentMonth) {
                      navigateMonth(date.getFullYear(), date.getMonth());
                    }
                    onSelect?.(date);
                  }}
                  whileTap={!isDisabled ? { scale: 0.92 } : undefined}
                  transition={springs.tactile}
                  aria-label={`${date.toDateString()}${isSelected ? ", selected" : ""}${isToday ? ", today" : ""}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative flex size-8 cursor-pointer items-center justify-center rounded-lg border border-transparent font-mono text-xs font-medium tabular-nums select-none",
                    // Current month vs outside month
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground/40",
                    // Hover & Focus (zero layout shift)
                    !isSelected && !isDisabled && "hover:bg-muted/70 hover:text-foreground",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none",
                    // Today outline indicator
                    isToday && !isSelected && "border-primary/40 text-primary",
                    // Selected state
                    isSelected &&
                      "specular-rim bg-primary text-primary-foreground shadow-xs hover:bg-primary/95",
                    // Disabled
                    isDisabled && "pointer-events-none cursor-not-allowed opacity-25"
                  )}
                >
                  <span>{dayNumber}</span>
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
                  )}
                </motion.button>
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
              "glass-thin h-9 w-56 justify-start gap-2 rounded-lg border-border/80 px-3 text-left font-normal",
              !selected && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <CalendarDaysIcon size={15} className="shrink-0 text-muted-foreground" />
        <span className="truncate text-xs tabular-nums">{formattedDate || placeholder}</span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="glass-thick specular-rim w-auto overflow-hidden rounded-2xl border-0 p-0 shadow-2xl"
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
