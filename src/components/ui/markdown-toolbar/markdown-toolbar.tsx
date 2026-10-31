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
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import type { MarkdownToolbarProps } from "./types";
import { ActionButton } from "./action-button";
import { useMarkdownToolbar } from "./use-markdown-toolbar";

export const MarkdownToolbar = React.forwardRef<HTMLDivElement, MarkdownToolbarProps>(
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
    const {
      wrapSelection,
      toggleLinePrefix,
      insertBlock,
      insertTable,
      insertLink,
      insertImage,
      activeFormats,
      executeAction,
      getTextarea,
    } = useMarkdownToolbar({ textareaRef, onAction });

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
                  <TooltipTrigger
                    render={
                      <ActionButton
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
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                    <span>Undo</span>
                    <Kbd size="xs" variant="inverted">
                      ⌘Z
                    </Kbd>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
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
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                    <span>Redo</span>
                    <Kbd size="xs" variant="inverted">
                      ⇧⌘Z
                    </Kbd>
                  </TooltipContent>
                </Tooltip>
              </ToolbarGroup>
              <ToolbarSeparator />
            </>
          )}

          {/* Typography Formatting */}
          <ToolbarGroup aria-label="Text styling">
            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.bold}
                    aria-label="Bold text"
                    onClick={() =>
                      executeAction("bold", () => wrapSelection("**", "**", "bold text"))
                    }
                  >
                    <BoldIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Bold</span>
                <Kbd size="xs" variant="inverted">
                  ⌘B
                </Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.italic}
                    aria-label="Italic text"
                    onClick={() =>
                      executeAction("italic", () => wrapSelection("*", "*", "italic text"))
                    }
                  >
                    <ItalicIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Italic</span>
                <Kbd size="xs" variant="inverted">
                  ⌘I
                </Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.strikethrough}
                    aria-label="Strikethrough text"
                    onClick={() =>
                      executeAction("strikethrough", () =>
                        wrapSelection("~~", "~~", "strikethrough text")
                      )
                    }
                  >
                    <StrikethroughIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Strikethrough</span>
                <Kbd size="xs" variant="inverted">
                  ⇧⌘X
                </Kbd>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.inlineCode}
                    aria-label="Inline code"
                    onClick={() =>
                      executeAction("inlineCode", () => wrapSelection("`", "`", "code"))
                    }
                  >
                    <CodeIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                <span>Inline Code</span>
                <Kbd size="xs" variant="inverted">
                  ⌘E
                </Kbd>
              </TooltipContent>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Structure & Headings */}
          <ToolbarGroup aria-label="Structure and headings">
            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.h1}
                    aria-label="Heading 1"
                    onClick={() => executeAction("h1", () => toggleLinePrefix("# "))}
                  >
                    <Heading1Icon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="text-[11px]">
                <span>Heading 1</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.h2}
                    aria-label="Heading 2"
                    onClick={() => executeAction("h2", () => toggleLinePrefix("## "))}
                  >
                    <Heading2Icon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="text-[11px]">
                <span>Heading 2</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.h3}
                    aria-label="Heading 3"
                    onClick={() => executeAction("h3", () => toggleLinePrefix("### "))}
                  >
                    <Heading3Icon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="text-[11px]">
                <span>Heading 3</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.quote}
                    aria-label="Blockquote"
                    onClick={() => executeAction("quote", () => toggleLinePrefix("> "))}
                  >
                    <QuoteIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="text-[11px]">
                <span>Blockquote</span>
              </TooltipContent>
            </Tooltip>
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Lists & Tasks */}
          <ToolbarGroup aria-label="Lists and tasks">
            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.bulletList}
                    aria-label="Bullet list"
                    onClick={() => executeAction("bulletList", () => toggleLinePrefix("- "))}
                  >
                    <ListIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="text-[11px]">
                <span>Bullet List</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.orderedList}
                    aria-label="Numbered list"
                    onClick={() =>
                      executeAction("orderedList", () => toggleLinePrefix("orderedList"))
                    }
                  >
                    <ListOrderedIcon className="size-3.5" />
                  </ActionButton>
                }
              />
              <TooltipContent side="top" className="text-[11px]">
                <span>Numbered List</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    type="button"
                    isActive={activeFormats.taskList}
                    aria-label="Task checklist"
                    onClick={() => executeAction("taskList", () => toggleLinePrefix("- [ ] "))}
                  >
                    <ListTodoIcon className="size-3.5" />
                  </ActionButton>
                }
              />
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
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        aria-label="Insert hyperlink"
                        onClick={() => executeAction("link", insertLink)}
                      >
                        <LinkIcon className="size-3.5" />
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="flex items-center gap-1.5 text-[11px]">
                    <span>Hyperlink</span>
                    <Kbd size="xs" variant="inverted">
                      ⌘K
                    </Kbd>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        aria-label="Insert image"
                        onClick={() => executeAction("image", insertImage)}
                      >
                        <ImageIcon className="size-3.5" />
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Image</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        aria-label="Insert table"
                        onClick={() => executeAction("table", () => insertTable(2, 3))}
                      >
                        <TableIcon className="size-3.5" />
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Table Grid</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        aria-label="Insert horizontal rule"
                        onClick={() => executeAction("horizontalRule", () => insertBlock("---"))}
                      >
                        <MinusIcon className="size-3.5" />
                      </ActionButton>
                    }
                  />
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
              <ToolbarGroup
                aria-label="Editor view mode"
                className="rounded-lg border border-border/50 bg-muted/40 p-0.5"
              >
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        size="xs"
                        aria-label="Edit view"
                        isActive={viewMode === "edit"}
                        onClick={() => onViewModeChange("edit")}
                      >
                        <PenLineIcon className="size-3" />
                        <span className="hidden text-[11px] sm:inline">Write</span>
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Write Mode</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        size="xs"
                        aria-label="Split editor and preview"
                        isActive={viewMode === "split"}
                        onClick={() => onViewModeChange("split")}
                      >
                        <Columns2Icon className="size-3" />
                        <span className="hidden text-[11px] sm:inline">Split</span>
                      </ActionButton>
                    }
                  />
                  <TooltipContent side="top" className="text-[11px]">
                    <span>Split View</span>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ActionButton
                        type="button"
                        size="xs"
                        aria-label="Preview view"
                        isActive={viewMode === "preview"}
                        onClick={() => onViewModeChange("preview")}
                      >
                        <EyeIcon className="size-3" />
                        <span className="hidden text-[11px] sm:inline">Preview</span>
                      </ActionButton>
                    }
                  />
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
