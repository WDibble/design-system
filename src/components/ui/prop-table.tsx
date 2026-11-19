"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface PropDefinition {
  /** Exact TypeScript property identifier */
  name: string;
  /** TypeScript type signature */
  type: string;
  /** Default value when omitted */
  defaultValue?: string;
  /** Whether the property is required on the component */
  required?: boolean;
  /** Concise behaviour description */
  description: string;
}

export interface PropTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Component prop rows to document */
  props: PropDefinition[];
  /** Optional table heading label */
  title?: string;
  /** Optional caption describing inherited DOM attributes */
  caption?: string;
  /** Fallback text displayed when props array is empty */
  emptyMessage?: string;
}

export const PropTable = React.forwardRef<HTMLDivElement, PropTableProps>(
  (
    {
      props: propItems,
      title,
      caption,
      emptyMessage = "No custom props declared; accepts standard native HTML element attributes.",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("flex w-full min-w-0 flex-col gap-2.5", className)} {...rest}>
        {title && (
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {propItems.length} {propItems.length === 1 ? "prop" : "props"}
            </span>
          </div>
        )}

        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Prop</TableHead>
              <TableHead className="w-[220px]">Type</TableHead>
              <TableHead className="w-[120px]">Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              propItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="align-top">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <code className="font-mono text-xs font-semibold whitespace-nowrap text-foreground">
                        {item.name}
                      </code>
                      {item.required && (
                        <Badge variant="destructive" size="sm">
                          Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="min-w-[140px] align-top">
                    <code className="font-mono text-xs break-words text-primary">{item.type}</code>
                  </TableCell>

                  <TableCell className="align-top whitespace-nowrap">
                    {item.defaultValue ? (
                      <code className="font-mono text-xs text-foreground tabular-nums">
                        {item.defaultValue}
                      </code>
                    ) : (
                      <span className="text-xs text-muted-foreground/70 italic">none</span>
                    )}
                  </TableCell>

                  <TableCell className="min-w-[220px] align-top text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground">
                    {item.description}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
);
PropTable.displayName = "PropTable";
