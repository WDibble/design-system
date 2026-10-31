import type * as React from "react";
import type { Toolbar } from "@/components/ui/toolbar";

export interface MarkdownActionHelpers {
  wrapSelection: (prefix: string, suffix?: string, placeholder?: string) => void;
  toggleLinePrefix: (prefixOrType: string | "orderedList") => void;
  insertBlock: (block: string, selectRange?: [number, number]) => void;
  insertTable: (rows?: number, cols?: number) => void;
  undo: () => void;
  redo: () => void;
}

export interface MarkdownToolbarProps extends Omit<
  React.ComponentProps<typeof Toolbar>,
  "children"
> {
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

export interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  inlineCode: boolean;
  h1: boolean;
  h2: boolean;
  h3: boolean;
  quote: boolean;
  bulletList: boolean;
  orderedList: boolean;
  taskList: boolean;
}
