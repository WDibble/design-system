"use client";

import * as React from "react";
import { ChevronRightIcon, FoldersIcon, FolderOpenIcon, FileTextIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface TreeNodeData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNodeData[];
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeNodeData[];
  selectedId?: string;
  onSelect?: (node: TreeNodeData) => void;
  defaultExpandedIds?: string[];
}

export function Tree({
  data,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className,
  ...props
}: TreeProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(defaultExpandedIds)
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      role="tree"
      className={cn("flex flex-col gap-0.5 select-none text-xs", className)}
      {...props}
    >
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          selectedId={selectedId}
          expandedIds={expandedIds}
          onToggleExpand={toggleExpand}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

interface TreeNodeItemProps {
  node: TreeNodeData;
  level: number;
  selectedId?: string;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect?: (node: TreeNodeData) => void;
}

function TreeNodeItem({
  node,
  level,
  selectedId,
  expandedIds,
  onToggleExpand,
  onSelect,
}: TreeNodeItemProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.disabled) return;

    if (hasChildren) {
      onToggleExpand(node.id);
    }
    if (onSelect) {
      onSelect(node);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
      e.preventDefault();
      onToggleExpand(node.id);
    } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
      e.preventDefault();
      onToggleExpand(node.id);
    }
  };

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <button
        type="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={node.disabled}
        style={{ paddingLeft: `${Math.max(8, level * 16 + 8)}px` }}
        className={cn(
          "flex w-full items-center gap-2 py-1.5 pr-2.5 rounded-md text-left font-medium outline-none",
          "text-foreground/80 hover:text-foreground hover:bg-muted/50",
          "transition-[background-color,color,transform] duration-100 ease-out",
          // Focus ring:
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          // Directive 1: Tactile yield:
          "active:scale-[0.985]",
          isSelected && "bg-primary/10 text-primary font-semibold hover:bg-primary/15",
          node.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        {/* Chevron Affordance */}
        {hasChildren ? (
          <span
            className={cn(
              "flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-150 ease-out",
              isExpanded && "rotate-90"
            )}
          >
            <ChevronRightIcon size={12} />
          </span>
        ) : (
          <span className="size-4 shrink-0" />
        )}

        {/* Node Icon */}
        <span className="shrink-0 text-muted-foreground flex items-center justify-center">
          {node.icon || (hasChildren ? (isExpanded ? <FolderOpenIcon size={14} /> : <FoldersIcon size={14} />) : <FileTextIcon size={14} />)}
        </span>

        {/* Node Label */}
        <span className="truncate flex-1 text-xs">{node.label}</span>

        {/* Optional Badge */}
        {node.badge && <span className="ml-auto shrink-0">{node.badge}</span>}
      </button>

      {/* Child Nodes */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col gap-0.5">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
