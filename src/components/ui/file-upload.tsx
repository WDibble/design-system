"use client";

import * as React from "react";
import { UploadIcon, FileTextIcon, XIcon, CircleCheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  file: File;
  progress?: number;
  error?: string;
  status?: "pending" | "uploading" | "complete" | "error";
}

export interface FileUploadProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "title"
> {
  value?: FileItem[];
  onChange?: (files: FileItem[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  disabled?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatAcceptedTypes(accept?: string): string {
  if (!accept) return "all file formats";
  const items = accept
    .split(",")
    .map((s) => s.trim().replace(/^\./, "").toUpperCase())
    .filter(Boolean);

  if (items.length === 0) return "all file formats";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      value = [],
      onChange,
      accept,
      maxFiles = 5,
      maxSizeMB = 10,
      disabled = false,
      title,
      description,
      children,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleFiles = (incomingFiles: FileList | null) => {
      if (!incomingFiles || incomingFiles.length === 0 || disabled) return;
      setErrorMessage(null);

      const validFiles: FileItem[] = [];
      const maxBytes = maxSizeMB * 1024 * 1024;

      Array.from(incomingFiles).forEach((file) => {
        if (value.length + validFiles.length >= maxFiles) {
          setErrorMessage(`Maximum limit of ${maxFiles} files reached.`);
          return;
        }

        if (file.size > maxBytes) {
          setErrorMessage(`"${file.name}" exceeds the ${maxSizeMB} MB limit.`);
          return;
        }

        if (accept) {
          const acceptedList = accept.split(",").map((s) => s.trim().toLowerCase());
          const fileName = file.name.toLowerCase();
          const fileType = file.type.toLowerCase();
          const matches = acceptedList.some((pat) => {
            if (pat.startsWith(".")) {
              return fileName.endsWith(pat);
            }
            if (pat.endsWith("/*")) {
              const prefix = pat.replace("/*", "");
              return fileType.startsWith(prefix);
            }
            return fileType === pat;
          });

          if (!matches) {
            setErrorMessage(
              `"${file.name}" has an unsupported format. Please provide ${formatAcceptedTypes(accept)}.`
            );
            return;
          }
        }

        validFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          progress: 100,
          status: "complete",
        });
      });

      if (validFiles.length > 0 && onChange) {
        onChange([...value, ...validFiles]);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    const removeFile = (id: string) => {
      if (onChange) {
        onChange(value.filter((item) => item.id !== id));
      }
    };

    return (
      <div ref={ref} className={cn("flex w-full flex-col gap-3", className)} {...props}>
        {/* Hidden Native File Input */}
        <input
          ref={inputRef}
          type="file"
          tabIndex={-1}
          accept={accept}
          multiple={maxFiles > 1}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          aria-hidden="true"
        />

        {/* Dropzone Container */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label="Upload files dropzone"
          aria-disabled={disabled}
          className={cn(
            "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center select-none sm:p-7",
            "transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out outline-none",
            "border-border/80 bg-muted/15 hover:border-foreground/40 hover:bg-muted/30",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            // Directive 1: Tactile yield on pointerdown
            "active:scale-[0.99]",
            isDragging && "scale-[1.005] border-primary bg-primary/5 ring-2 ring-primary/20",
            disabled && "pointer-events-none cursor-not-allowed opacity-50"
          )}
        >
          <div
            className={cn(
              "mb-3 flex size-11 items-center justify-center rounded-full border border-border/80 bg-card text-muted-foreground shadow-xs",
              "transition-transform duration-200 ease-out group-hover:scale-105 group-hover:text-primary",
              isDragging && "scale-110 border-primary/50 text-primary shadow-sm"
            )}
          >
            <UploadIcon size={18} />
          </div>

          <p className="text-xs font-semibold tracking-tight text-foreground">
            {title || (
              <>
                Drag and drop files here, or{" "}
                <span className="font-semibold text-primary underline underline-offset-4">
                  browse
                </span>
              </>
            )}
          </p>

          <p className="mt-1.5 max-w-sm text-[11px] leading-relaxed text-muted-foreground">
            {description || (
              <>
                <span>Supports {formatAcceptedTypes(accept)}</span>
                <span className="mx-1.5 text-border/80">·</span>
                <span className="tabular-nums">Up to {maxSizeMB} MB per file</span>
                {maxFiles > 1 && (
                  <>
                    <span className="mx-1.5 text-border/80">·</span>
                    <span className="tabular-nums">Maximum {maxFiles} files</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <p className="px-1 text-xs font-medium text-destructive">{errorMessage}</p>
        )}

        {/* Uploaded File List */}
        {value.length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            {value.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card p-2.5 text-xs shadow-xs"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <FileTextIcon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{item.file.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground tabular-nums">
                      <span>{formatFileSize(item.file.size)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                        <CircleCheckIcon size={11} /> Ready
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="xs"
                  variant="ghost"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(item.id);
                  }}
                  aria-label={`Remove file ${item.file.name}`}
                  className="size-7 p-0 text-muted-foreground hover:text-destructive"
                >
                  <XIcon size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";
