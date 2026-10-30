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

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
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
            setErrorMessage(`"${file.name}" has an unsupported format. Please provide ${formatAcceptedTypes(accept)}.`);
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
      <div ref={ref} className={cn("flex flex-col gap-3 w-full", className)} {...props}>
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
            "group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-xl border border-dashed text-center cursor-pointer select-none",
            "transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out outline-none",
            "bg-muted/15 border-border/80 hover:bg-muted/30 hover:border-foreground/40",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            // Directive 1: Tactile yield on pointerdown
            "active:scale-[0.99]",
            isDragging && "border-primary bg-primary/5 ring-2 ring-primary/20 scale-[1.005]",
            disabled && "pointer-events-none opacity-50 cursor-not-allowed"
          )}
        >
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-full bg-card border border-border/80 text-muted-foreground shadow-xs mb-3",
              "transition-transform duration-200 ease-out group-hover:scale-105 group-hover:text-primary",
              isDragging && "scale-110 text-primary border-primary/50 shadow-sm"
            )}
          >
            <UploadIcon size={18} />
          </div>

          <p className="text-xs font-semibold text-foreground tracking-tight">
            {title || (
              <>
                Drag and drop files here, or <span className="text-primary underline underline-offset-4 font-semibold">browse</span>
              </>
            )}
          </p>

          <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed max-w-sm">
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
          <p className="text-xs text-destructive font-medium px-1">
            {errorMessage}
          </p>
        )}

        {/* Uploaded File List */}
        {value.length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            {value.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/60 bg-card shadow-xs text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <FileTextIcon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">
                      {item.file.name}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground tabular-nums">
                      <span>{formatFileSize(item.file.size)}</span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
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
