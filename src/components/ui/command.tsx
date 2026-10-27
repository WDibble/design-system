"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface CommandContextValue {
  search: string;
  setSearch: (value: string) => void;
}

const CommandContext = React.createContext<CommandContextValue>({
  search: "",
  setSearch: () => {},
});

export function Command({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [search, setSearch] = React.useState("");

  return (
    <CommandContext.Provider value={{ search, setSearch }}>
      <div
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-2xl glass-regular specular-rim text-popover-foreground select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function CommandDialog({ open, onOpenChange, children }: CommandDialogProps) {
  // Global ⌘K / Ctrl+K listener:
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const target = e.target as HTMLElement;
        const isInputField =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        // Detail #4: Do not trigger shortcut when user is already typing inside a form field
        if (isInputField && !target.closest("[role='dialog']")) {
          return;
        }

        e.preventDefault();
        onOpenChange?.(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed left-1/2 top-1/3 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl glass-regular specular-rim shadow-2xl p-0 outline-none",
            "transition-[scale,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0"
          )}
        >
          <Command className="border-0 shadow-none bg-transparent">
            {children}
          </Command>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = React.useContext(CommandContext);

  return (
    <div className="flex items-center px-4 border-b border-border/60">
      <SearchIcon className="mr-3 size-4 shrink-0 text-muted-foreground opacity-70" />
      <input
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type a command or search..."
        className={cn(
          "flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {search && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSearch("")}
          aria-label="Clear search query"
          className="size-7 rounded-lg text-muted-foreground hover:text-foreground shrink-0 after:-inset-2"
        >
          <XIcon size={14} />
        </Button>
      )}
    </div>
  );
});
CommandInput.displayName = "CommandInput";

export const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-2", className)}
    {...props}
  />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { search } = React.useContext(CommandContext);
  if (!search) return null;

  return (
    <div
      ref={ref}
      className={cn("py-6 text-center text-xs text-muted-foreground", className)}
      {...props}
    >
      {children || `No results found for "${search}"`}
    </div>
  );
});
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-hidden p-1 text-foreground", className)}
    {...props}
  >
    {heading && (
      <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
        {heading}
      </div>
    )}
    {children}
  </div>
));
CommandGroup.displayName = "CommandGroup";

export const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border/60", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

export const CommandItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onSelect?: () => void }
>(({ className, onSelect, onKeyDown, children, ...props }, ref) => (
  <div
    ref={ref}
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => {
      onKeyDown?.(e);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.();
      }
    }}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium outline-none",
      "transition-all duration-100",
      "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:bg-accent focus-visible:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
CommandItem.displayName = "CommandItem";

export const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-[10px] tracking-widest text-muted-foreground font-mono bg-muted/60 px-1.5 py-0.5 rounded-md border border-border/40",
      className
    )}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";
