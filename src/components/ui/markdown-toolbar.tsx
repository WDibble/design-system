"use client";

import * as React from "react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  QuoteIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LinkIcon,
  ImageIcon,
  TableIcon,
  MinusIcon,
  Undo2Icon,
  Redo2Icon,
  EyeIcon,
  Columns2Icon,
  PenLineIcon,
} from "lucide-react";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
} from "@/components/ui/toolbar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export interface MarkdownActionHelpers {
  wrapSelection: (prefix: string, suffix?: string, placeholder?: string) => void;
  toggleLinePrefix: (prefixOrType: string | "orderedList") => void;
  insertBlock: (block: string, selectRange?: [number, number]) => void;
  insertTable: (rows?: number, cols?: number) => void;
  undo: () => void;
  redo: () => void;
}

/**
 * Perform a selection-aware text mutation on a HTMLTextAreaElement while preserving
 * the browser's native undo/redo stack via setRangeText.
 */
function applyTextMutation(
  textarea: HTMLTextAreaElement,
  replacement: string,
  selectionMode: "select" | "start" | "end" | "preserve" = "select",
  customStart?: number,
  customEnd?: number
) {
  const start = customStart ?? textarea.selectionStart;
  const end = customEnd ?? textarea.selectionEnd;

  textarea.focus();
  // Using setRangeText preserves the browser undo/redo history in modern engines
  textarea.setRangeText(replacement, start, end, selectionMode);

  // Dispatch synthetic input event for React controlled state synchronization
  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);
}

export interface MarkdownToolbarProps
  extends Omit<React.ComponentProps<typeof Toolbar>, "children"> {
  /**
   * Reference to the controlled or uncontrolled textarea element.
   */
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  /**
   * Current active view mode when paired with a preview panel.
   */
  viewMode?: "edit" | "split" | "preview";
  /**
   * Callback fired when view mode changes.
   */
  onViewModeChange?: (mode: "edit" | "split" | "preview") => void;
  /**
   * Callback fired whenever any markdown action is executed.
   */
  onAction?: (actionName: string) => void;
  /**
   * Allows consumers to hide specific action clusters.
   */
  hideHistory?: boolean;
  hideViewMode?: boolean;
  hideInserts?: boolean;
}

export const MarkdownToolbar = React.forwardRef<
  HTMLDivElement,
  MarkdownToolbarProps
>(
  (
    {
      className,
      textareaRef,
      viewMode,
      onViewModeChange,
      onAction,
      hideHistory = false,
      hideViewMode = false,
      hideInserts = false,
      variant = "default",
      size = "sm",
      ...props
    },
    ref
  ) => {
    const getTextarea = React.useCallback((): HTMLTextAreaElement | null => {
      if (!textareaRef) return null;
      return textareaRef.current;
    }, [textareaRef]);

    const wrapSelection = React.useCallback(
      (prefix: string, suffix = prefix, placeholder = "text") => {
        const textarea = getTextarea();
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const selected = value.substring(start, end);

        // Toggle unwrapping if already cleanly wrapped
        const prefixLen = prefix.length;
        const suffixLen = suffix.length;
        const beforeText = value.substring(start - prefixLen, start);
        const afterText = value.substring(end, end + suffixLen);

        if (beforeText === prefix && afterText === suffix) {
          // Unwrap outer symbols
          textarea.setSelectionRange(start - prefixLen, end + suffixLen);
          applyTextMutation(textarea, selected, "select");
          return;
        }

        const textToWrap = selected.length > 0 ? selected : placeholder;
        const replacement = `${prefix}${textToWrap}${suffix}`;
        applyTextMutation(textarea, replacement, "select");

        // Position cursor over the placeholder text if none was originally selected
        if (selected.length === 0) {
          const newStart = start + prefix.length;
          const newEnd = newStart + placeholder.length;
          textarea.setSelectionRange(newStart, newEnd);
        }
      },
      [getTextarea]
    );

    const toggleLinePrefix = React.useCallback(
      (prefixOrType: string | "orderedList") => {
        const textarea = getTextarea();
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        // Expand selection to encompass full lines
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const lineEndIndex = value.indexOf("\n", end);
        const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;

        const selectedLines = value.substring(lineStart, lineEnd).split("\n");

        let newLines: string[];

        if (prefixOrType === "orderedList") {
          const numberRegex = /^\d+\.\s+/;
          const allHaveNumbers = selectedLines.every((l) => numberRegex.test(l.trimStart()));
          if (allHaveNumbers) {
            // Toggle OFF: strip the numbers cleanly
            newLines = selectedLines.map((l) => l.replace(numberRegex, ""));
          } else {
            // Toggle ON: strip bullet/checklist/existing numbers if present, then add ordered numbers
            newLines = selectedLines.map((l, idx) => {
              const clean = l
                .replace(/^(\s*)-\s+(\[[ x]\]\s+)?/, "$1")
                .replace(/^(\s*)\d+\.\s+/, "$1");
              return `${idx + 1}. ${clean}`;
            });
          }
        } else {
          const prefix = prefixOrType;
          const isHeading = prefix.startsWith("#");
          const headingRegex = /^#{1,6}\s+/;
          const isBullet = prefix === "- ";
          const isChecklist = prefix === "- [ ] ";
          const bulletRegex = /^-\s+/;
          const checklistRegex = /^-\s+\[[ x]\]\s+/;
          const numberRegex = /^\d+\.\s+/;

          if (isHeading) {
            const allHaveExactHeading = selectedLines.every((l) => l.startsWith(prefix));
            if (allHaveExactHeading) {
              newLines = selectedLines.map((l) => l.replace(headingRegex, ""));
            } else {
              newLines = selectedLines.map((l) => `${prefix}${l.replace(headingRegex, "")}`);
            }
          } else if (isChecklist) {
            const allHaveChecklist = selectedLines.every((l) => checklistRegex.test(l));
            if (allHaveChecklist) {
              newLines = selectedLines.map((l) => l.replace(checklistRegex, ""));
            } else {
              newLines = selectedLines.map((l) => {
                const clean = l.replace(checklistRegex, "").replace(bulletRegex, "").replace(numberRegex, "");
                return `${prefix}${clean}`;
              });
            }
          } else if (isBullet) {
            const allHaveBullet = selectedLines.every((l) => bulletRegex.test(l) && !checklistRegex.test(l));
            if (allHaveBullet) {
              newLines = selectedLines.map((l) => l.replace(bulletRegex, ""));
            } else {
              newLines = selectedLines.map((l) => {
                const clean = l.replace(checklistRegex, "").replace(bulletRegex, "").replace(numberRegex, "");
                return `${prefix}${clean}`;
              });
            }
          } else {
            const allHavePrefix = selectedLines.every((l) => l.startsWith(prefix));
            if (allHavePrefix) {
              newLines = selectedLines.map((l) => l.substring(prefix.length));
            } else {
              newLines = selectedLines.map((l) => `${prefix}${l}`);
            }
          }
        }

        const replacement = newLines.join("\n");
        applyTextMutation(textarea, replacement, "select", lineStart, lineEnd);
      },
      [getTextarea]
    );

    const insertBlock = React.useCallback(
      (block: string) => {
        const textarea = getTextarea();
        if (!textarea) return;

        const start = textarea.selectionStart;
        const value = textarea.value;

        // Ensure boundary spacing around blocks
        const needsLeadingNewline = start > 0 && value[start - 1] !== "\n";
        const prefix = needsLeadingNewline ? "\n" : "";
        const replacement = `${prefix}${block}\n`;

        applyTextMutation(textarea, replacement, "end");
      },
      [getTextarea]
    );

    const insertTable = React.useCallback(
      (rows = 2, cols = 3) => {
        const headers = Array.from({ length: cols }, (_, i) => `Column ${i + 1}`).join(" | ");
        const dividers = Array.from({ length: cols }, () => "---").join(" | ");
        const rowContent = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, (_, i) => `Data ${i + 1}`).join(" | ")
        ).join("\n| ") + " |";

        const table = `\n| ${headers} |\n| ${dividers} |\n| ${rowContent}\n`;
        insertBlock(table);
      },
      [insertBlock]
    );

    const [activeFormats, setActiveFormats] = React.useState({
      bold: false,
      italic: false,
      strikethrough: false,
      inlineCode: false,
      h1: false,
      h2: false,
      h3: false,
      quote: false,
      bulletList: false,
      orderedList: false,
      taskList: false,
    });

    const updateActiveFormats = React.useCallback(() => {
      const textarea = getTextarea();
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      // Expand selection to encompass full lines for line-level checks
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEndIndex = value.indexOf("\n", end);
      const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
      const currentLines = value.substring(lineStart, lineEnd).split("\n").filter((l) => l.length > 0);

      const isBullet = currentLines.length > 0 && currentLines.every((l) => /^-\s+/.test(l) && !/^-\s+\[[ x]\]\s+/.test(l));
      const isOrdered = currentLines.length > 0 && currentLines.every((l) => /^\d+\.\s+/.test(l.trimStart()));
      const isTask = currentLines.length > 0 && currentLines.every((l) => /^-\s+\[[ x]\]\s+/.test(l));
      const isH1 = currentLines.length > 0 && currentLines.every((l) => /^#\s+/.test(l));
      const isH2 = currentLines.length > 0 && currentLines.every((l) => /^##\s+/.test(l));
      const isH3 = currentLines.length > 0 && currentLines.every((l) => /^###\s+/.test(l));
      const isQuote = currentLines.length > 0 && currentLines.every((l) => /^>\s+/.test(l));

      // Inline formatting checks
      const selected = value.substring(start, end);
      const before2 = value.substring(Math.max(0, start - 2), start);
      const after2 = value.substring(end, Math.min(value.length, end + 2));
      const before1 = value.substring(Math.max(0, start - 1), start);
      const after1 = value.substring(end, Math.min(value.length, end + 1));

      const isBold = (before2 === "**" && after2 === "**") || (selected.startsWith("**") && selected.endsWith("**") && selected.length >= 4);
      const isStrike = (before2 === "~~" && after2 === "~~") || (selected.startsWith("~~") && selected.endsWith("~~") && selected.length >= 4);
      const isItalic = (before1 === "*" && after1 === "*") || (selected.startsWith("*") && selected.endsWith("*") && selected.length >= 2);
      const isCode = (before1 === "`" && after1 === "`") || (selected.startsWith("`") && selected.endsWith("`") && selected.length >= 2);

      setActiveFormats((prev) => {
        if (
          prev.bold === isBold &&
          prev.italic === isItalic &&
          prev.strikethrough === isStrike &&
          prev.inlineCode === isCode &&
          prev.h1 === isH1 &&
          prev.h2 === isH2 &&
          prev.h3 === isH3 &&
          prev.quote === isQuote &&
          prev.bulletList === isBullet &&
          prev.orderedList === isOrdered &&
          prev.taskList === isTask
        ) {
          return prev;
        }
        return {
          bold: isBold,
          italic: isItalic,
          strikethrough: isStrike,
          inlineCode: isCode,
          h1: isH1,
          h2: isH2,
          h3: isH3,
          quote: isQuote,
          bulletList: isBullet,
          orderedList: isOrdered,
          taskList: isTask,
        };
      });
    }, [getTextarea]);

    React.useEffect(() => {
      const textarea = getTextarea();
      if (!textarea) return;

      const handleSelection = () => {
        updateActiveFormats();
      };

      textarea.addEventListener("select", handleSelection);
      textarea.addEventListener("keyup", handleSelection);
      textarea.addEventListener("mouseup", handleSelection);
      textarea.addEventListener("input", handleSelection);
      textarea.addEventListener("focus", handleSelection);
      document.addEventListener("selectionchange", handleSelection);

      updateActiveFormats();

      return () => {
        textarea.removeEventListener("select", handleSelection);
        textarea.removeEventListener("keyup", handleSelection);
        textarea.removeEventListener("mouseup", handleSelection);
        textarea.removeEventListener("input", handleSelection);
        textarea.removeEventListener("focus", handleSelection);
        document.removeEventListener("selectionchange", handleSelection);
      };
    }, [getTextarea, updateActiveFormats]);

    const executeAction = (name: string, handler: () => void) => {
      handler();
      onAction?.(name);
      setTimeout(updateActiveFormats, 0);
    };

    return (
      <TooltipProvider delay={200}>
        <Toolbar
          ref={ref}
          variant={variant}
          size={size}
          className={cn("flex-wrap gap-1", className)}
          aria-label="Markdown formatting toolbar"
          {...props}
        >
          {/* History Operations */}
          {!hideHistory && (
            <>
              <ToolbarGroup aria-label="History">
                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      aria-label="Undo last change"
                      onClick={() =>
                        executeAction("undo", () => {
                          const textarea = getTextarea();
                          if (textarea) document.execCommand("undo");
                        })
                      }
                    >
                      <Undo2Icon className="size-3.5" />
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                    <span>Undo</span>
                    <Kbd size="xs" variant="inverted">⌘Z</Kbd>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      aria-label="Redo last change"
                      onClick={() =>
                        executeAction("redo", () => {
                          const textarea = getTextarea();
                          if (textarea) document.execCommand("redo");
                        })
                      }
                    >
                      <Redo2Icon className="size-3.5" />
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                    <span>Redo</span>
                    <Kbd size="xs" variant="inverted">⇧⌘Z</Kbd>
                  </TooltipContent>
                </Tooltip>
              </ToolbarGroup>
              <ToolbarSeparator />
            </>
          )}

          {/* Typography Formatting */}
          <ToolbarGroup aria-label="Text styling">
            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.bold}
                  aria-label="Bold text"
                  onClick={() => executeAction("bold", () => wrapSelection("**", "**", "bold text"))}
                >
                  <BoldIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Bold</span>
                <Kbd size="xs" variant="inverted">⌘B</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.italic}
                  aria-label="Italic text"
                  onClick={() => executeAction("italic", () => wrapSelection("*", "*", "italic text"))}
                >
                  <ItalicIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Italic</span>
                <Kbd size="xs" variant="inverted">⌘I</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.strikethrough}
                  aria-label="Strikethrough text"
                  onClick={() => executeAction("strikethrough", () => wrapSelection("~~", "~~", "strikethrough text"))}
                >
                  <StrikethroughIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Strikethrough</span>
                <Kbd size="xs" variant="inverted">⇧⌘X</Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.inlineCode}
                  aria-label="Inline code"
                  onClick={() => executeAction("inlineCode", () => wrapSelection("`", "`", "code"))}
                >
                  <CodeIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Inline Code</span>
                <Kbd size="xs" variant="inverted">⌘E</Kbd>
              </TooltipContent>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Structure & Headings */}
          <ToolbarGroup aria-label="Structure and headings">
            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.h1}
                  aria-label="Heading 1"
                  onClick={() => executeAction("h1", () => toggleLinePrefix("# "))}
                >
                  <Heading1Icon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Heading 1</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.h2}
                  aria-label="Heading 2"
                  onClick={() => executeAction("h2", () => toggleLinePrefix("## "))}
                >
                  <Heading2Icon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Heading 2</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.h3}
                  aria-label="Heading 3"
                  onClick={() => executeAction("h3", () => toggleLinePrefix("### "))}
                >
                  <Heading3Icon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Heading 3</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.quote}
                  aria-label="Blockquote"
                  onClick={() => executeAction("quote", () => toggleLinePrefix("> "))}
                >
                  <QuoteIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Blockquote</span>
              </TooltipContent>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Lists & Tasks */}
          <ToolbarGroup aria-label="Lists and tasks">
            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.bulletList}
                  aria-label="Bullet list"
                  onClick={() => executeAction("bulletList", () => toggleLinePrefix("- "))}
                >
                  <ListIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Bullet List</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.orderedList}
                  aria-label="Numbered list"
                  onClick={() =>
                    executeAction("orderedList", () =>
                      toggleLinePrefix("orderedList")
                    )
                  }
                >
                  <ListOrderedIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Numbered List</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={
                <ToolbarButton
                  type="button"
                  isActive={activeFormats.taskList}
                  aria-label="Task checklist"
                  onClick={() => executeAction("taskList", () => toggleLinePrefix("- [ ] "))}
                >
                  <ListTodoIcon className="size-3.5" />
                </ToolbarButton>
              } />
              <TooltipContent side="top" className="text-[11px]">
                <span>Task Checklist</span>
              </TooltipContent>
            </Tooltip>
          </ToolbarGroup>

          {/* Inserts & Media */}
          {!hideInserts && (
            <>
              <ToolbarSeparator />
              <ToolbarGroup aria-label="Inserts and elements">
                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      aria-label="Insert hyperlink"
                      onClick={() =>
                        executeAction("link", () => {
                          const textarea = getTextarea();
                          const selected = textarea ? textarea.value.substring(textarea.selectionStart, textarea.selectionEnd) : "";
                          const label = selected.length > 0 ? selected : "link title";
                          wrapSelection(`[${label}](`, ")", "https://example.com");
                        })
                      }
                    >
                      <LinkIcon className="size-3.5" />
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                    <span>Hyperlink</span>
                    <Kbd size="xs" variant="inverted">⌘K</Kbd>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      aria-label="Insert image"
                      onClick={() => executeAction("image", () => wrapSelection("![alt text](", ")", "https://image-url.png"))}
                    >
                      <ImageIcon className="size-3.5" />
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Image</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      aria-label="Insert table"
                      onClick={() => executeAction("table", () => insertTable(2, 3))}
                    >
                      <TableIcon className="size-3.5" />
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Table Grid</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      aria-label="Insert horizontal rule"
                      onClick={() => executeAction("horizontalRule", () => insertBlock("---"))}
                    >
                      <MinusIcon className="size-3.5" />
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Horizontal Divider</span>
                  </TooltipContent>
                </Tooltip>
              </ToolbarGroup>
            </>
          )}

          {/* View Mode Switching */}
          {!hideViewMode && onViewModeChange && (
            <>
              <div className="ml-auto" />
              <ToolbarGroup aria-label="Editor view mode" className="bg-muted/40 p-0.5 rounded-lg border border-border/50">
                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      size="xs"
                      aria-label="Edit view"
                      isActive={viewMode === "edit"}
                      onClick={() => onViewModeChange("edit")}
                    >
                      <PenLineIcon className="size-3" />
                      <span className="hidden sm:inline text-[11px]">Write</span>
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Write Mode</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      size="xs"
                      aria-label="Split editor and preview"
                      isActive={viewMode === "split"}
                      onClick={() => onViewModeChange("split")}
                    >
                      <Columns2Icon className="size-3" />
                      <span className="hidden sm:inline text-[11px]">Split</span>
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Split View</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={
                    <ToolbarButton
                      type="button"
                      size="xs"
                      aria-label="Preview view"
                      isActive={viewMode === "preview"}
                      onClick={() => onViewModeChange("preview")}
                    >
                      <EyeIcon className="size-3" />
                      <span className="hidden sm:inline text-[11px]">Preview</span>
                    </ToolbarButton>
                  } />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Rendered Preview</span>
                  </TooltipContent>
                </Tooltip>
              </ToolbarGroup>
            </>
          )}
        </Toolbar>
      </TooltipProvider>
    );
  }
);
MarkdownToolbar.displayName = "MarkdownToolbar";
