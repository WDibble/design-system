import * as React from "react";
import type { ActiveFormats } from "./types";
import { applyTextMutation, stripStructuralPrefix } from "./markdown-transforms";

interface UseMarkdownToolbarOptions {
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  onAction?: (actionName: string) => void;
}

export function useMarkdownToolbar({ textareaRef, onAction }: UseMarkdownToolbarOptions) {
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
      const prefixLen = prefix.length;
      const suffixLen = suffix.length;

      if (prefix === "`" && suffix === "`" && selected.includes("\n")) {
        const codeFence = "```\n" + selected + "\n```";
        applyTextMutation(textarea, codeFence, "select");
        return;
      }

      if (selected.includes("\n") && selected.length > 0) {
        const lines = selected.split("\n");
        const wrappedLines = lines.map((line) => {
          if (line.trim().length === 0) return line;
          const leadingWs = line.match(/^(\s*)/)?.[1] ?? "";
          const trailingWs = line.match(/(\s*)$/)?.[1] ?? "";
          const core = line.substring(leadingWs.length, line.length - trailingWs.length);
          return `${leadingWs}${prefix}${core}${suffix}${trailingWs}`;
        });
        applyTextMutation(textarea, wrappedLines.join("\n"), "select");
        return;
      }

      if (
        selected.startsWith(prefix) &&
        selected.endsWith(suffix) &&
        selected.length >= prefixLen + suffixLen
      ) {
        const unwrapped = selected.slice(prefixLen, selected.length - suffixLen);
        applyTextMutation(textarea, unwrapped, "select");
        return;
      }

      const beforeText = value.substring(Math.max(0, start - prefixLen), start);
      const afterText = value.substring(end, Math.min(value.length, end + suffixLen));
      const isBoldDelimCollision =
        prefix === "*" &&
        (value.substring(Math.max(0, start - 2), start) === "**" ||
          value.substring(end, Math.min(value.length, end + 2)) === "**");

      if (beforeText === prefix && afterText === suffix && !isBoldDelimCollision) {
        textarea.setSelectionRange(start - prefixLen, end + suffixLen);
        applyTextMutation(textarea, selected, "select");
        return;
      }

      if (start === end) {
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const lineEndIndex = value.indexOf("\n", start);
        const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
        const lineBefore = value.substring(lineStart, start);
        const lineAfter = value.substring(start, lineEnd);

        const lastPrefixIdx = lineBefore.lastIndexOf(prefix);
        const nextSuffixIdx = lineAfter.indexOf(suffix);

        if (lastPrefixIdx !== -1 && nextSuffixIdx !== -1 && !isBoldDelimCollision) {
          const fullStart = lineStart + lastPrefixIdx;
          const fullEnd = start + nextSuffixIdx + suffixLen;
          const enclosed = value.substring(fullStart + prefixLen, fullEnd - suffixLen);
          textarea.setSelectionRange(fullStart, fullEnd);
          applyTextMutation(textarea, enclosed, "select");
          return;
        }
      }

      if (selected.length > 0) {
        const leadingWs = selected.match(/^(\s*)/)?.[1] ?? "";
        const trailingWs = selected.match(/(\s*)$/)?.[1] ?? "";

        if (leadingWs.length > 0 || trailingWs.length > 0) {
          const core = selected.substring(leadingWs.length, selected.length - trailingWs.length);
          if (core.length > 0) {
            const replacement = `${leadingWs}${prefix}${core}${suffix}${trailingWs}`;
            applyTextMutation(textarea, replacement, "preserve");
            const newStart = start + leadingWs.length + prefixLen;
            const newEnd = newStart + core.length;
            textarea.setSelectionRange(newStart, newEnd);
            return;
          }
        }
      }

      const textToWrap = selected.length > 0 ? selected : placeholder;
      const replacement = `${prefix}${textToWrap}${suffix}`;
      applyTextMutation(textarea, replacement, "select");

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

      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEndIndex = value.indexOf("\n", end);
      const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;

      const selectedLines = value.substring(lineStart, lineEnd).split("\n");
      const headingRegex = /^(\s*)#{1,6}\s+/;
      const bulletRegex = /^(\s*)-\s+/;
      const checklistRegex = /^(\s*)-\s+\[[ x]\]\s+/;
      const numberRegex = /^(\s*)\d+\.\s+/;

      let newLines: string[];

      if (prefixOrType === "orderedList") {
        const allHaveNumbers = selectedLines.every(
          (l) => l.trim().length === 0 || numberRegex.test(l)
        );
        if (allHaveNumbers && selectedLines.some((l) => numberRegex.test(l))) {
          newLines = selectedLines.map((l) => l.replace(numberRegex, "$1"));
        } else {
          let itemIndex = 1;
          newLines = selectedLines.map((l) => {
            if (selectedLines.length > 1 && l.trim().length === 0) return l;
            const { indent, content } = stripStructuralPrefix(l);
            const num = itemIndex++;
            return `${indent}${num}. ${content}`;
          });
        }
      } else {
        const prefix = prefixOrType;
        const isHeading = prefix.startsWith("#");
        const isBullet = prefix === "- ";
        const isChecklist = prefix === "- [ ] ";

        if (isHeading) {
          const allHaveExactHeading = selectedLines.every(
            (l) => l.trim().length === 0 || l.trimStart().startsWith(prefix)
          );
          if (allHaveExactHeading && selectedLines.some((l) => l.trimStart().startsWith(prefix))) {
            newLines = selectedLines.map((l) => l.replace(headingRegex, "$1"));
          } else {
            newLines = selectedLines.map((l) => {
              if (selectedLines.length > 1 && l.trim().length === 0) return l;
              const { indent, content } = stripStructuralPrefix(l);
              return `${indent}${prefix}${content}`;
            });
          }
        } else if (isChecklist) {
          const allHaveChecklist = selectedLines.every(
            (l) => l.trim().length === 0 || checklistRegex.test(l)
          );
          if (allHaveChecklist && selectedLines.some((l) => checklistRegex.test(l))) {
            newLines = selectedLines.map((l) => l.replace(checklistRegex, "$1"));
          } else {
            newLines = selectedLines.map((l) => {
              if (selectedLines.length > 1 && l.trim().length === 0) return l;
              const { indent, content } = stripStructuralPrefix(l);
              return `${indent}${prefix}${content}`;
            });
          }
        } else if (isBullet) {
          const allHaveBullet = selectedLines.every(
            (l) => l.trim().length === 0 || (bulletRegex.test(l) && !checklistRegex.test(l))
          );
          if (
            allHaveBullet &&
            selectedLines.some((l) => bulletRegex.test(l) && !checklistRegex.test(l))
          ) {
            newLines = selectedLines.map((l) => l.replace(bulletRegex, "$1"));
          } else {
            newLines = selectedLines.map((l) => {
              if (selectedLines.length > 1 && l.trim().length === 0) return l;
              const { indent, content } = stripStructuralPrefix(l);
              return `${indent}${prefix}${content}`;
            });
          }
        } else {
          const allHavePrefix = selectedLines.every(
            (l) => l.trim().length === 0 || l.trimStart().startsWith(prefix)
          );
          if (allHavePrefix && selectedLines.some((l) => l.trimStart().startsWith(prefix))) {
            newLines = selectedLines.map((l) => {
              const idx = l.indexOf(prefix);
              return idx !== -1 ? l.substring(0, idx) + l.substring(idx + prefix.length) : l;
            });
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

      let leadingNewlines = "";
      if (start > 0) {
        if (value[start - 1] === "\n") {
          if (start > 1 && value[start - 2] !== "\n") {
            leadingNewlines = "\n";
          }
        } else {
          leadingNewlines = "\n\n";
        }
      }

      const after = value.substring(start);
      let trailingNewlines = "\n";
      if (after.length > 0) {
        if (after.startsWith("\n\n")) {
          trailingNewlines = "";
        } else if (after.startsWith("\n")) {
          trailingNewlines = "\n";
        } else {
          trailingNewlines = "\n\n";
        }
      }

      const replacement = `${leadingNewlines}${block}${trailingNewlines}`;
      applyTextMutation(textarea, replacement, "end");
    },
    [getTextarea]
  );

  const insertTable = React.useCallback(
    (rows = 2, cols = 3) => {
      const headers = Array.from({ length: cols }, (_, i) => `Column ${i + 1}`).join(" | ");
      const dividers = Array.from({ length: cols }, () => "---").join(" | ");
      const rowContent =
        Array.from({ length: rows }, () =>
          Array.from({ length: cols }, (_, i) => `Data ${i + 1}`).join(" | ")
        ).join("\n| ") + " |";

      const table = `| ${headers} |\n| ${dividers} |\n| ${rowContent}`;
      insertBlock(table);
    },
    [insertBlock]
  );

  const insertLink = React.useCallback(() => {
    const textarea = getTextarea();
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.substring(start, end).trim();

    const isUrl = /^https?:\/\//i.test(selected);

    if (isUrl) {
      const replacement = `[link title](${selected})`;
      applyTextMutation(textarea, replacement, "preserve");
      textarea.setSelectionRange(start + 1, start + 11);
    } else if (selected.length > 0) {
      const replacement = `[${selected}](https://example.com)`;
      applyTextMutation(textarea, replacement, "preserve");
      const urlStart = start + selected.length + 3;
      const urlEnd = urlStart + 19;
      textarea.setSelectionRange(urlStart, urlEnd);
    } else {
      const replacement = `[link title](https://example.com)`;
      applyTextMutation(textarea, replacement, "preserve");
      textarea.setSelectionRange(start + 1, start + 11);
    }
  }, [getTextarea]);

  const insertImage = React.useCallback(() => {
    const textarea = getTextarea();
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.substring(start, end).trim();

    const isUrl = /^https?:\/\//i.test(selected);

    if (isUrl) {
      const replacement = `![alt text](${selected})`;
      applyTextMutation(textarea, replacement, "preserve");
      textarea.setSelectionRange(start + 2, start + 10);
    } else if (selected.length > 0) {
      const replacement = `![${selected}](https://image-url.png)`;
      applyTextMutation(textarea, replacement, "preserve");
      const urlStart = start + selected.length + 4;
      const urlEnd = urlStart + 21;
      textarea.setSelectionRange(urlStart, urlEnd);
    } else {
      const replacement = `![alt text](https://image-url.png)`;
      applyTextMutation(textarea, replacement, "preserve");
      textarea.setSelectionRange(start + 2, start + 10);
    }
  }, [getTextarea]);

  const [activeFormats, setActiveFormats] = React.useState<ActiveFormats>({
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

    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const lineEndIndex = value.indexOf("\n", end);
    const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
    const currentLines = value
      .substring(lineStart, lineEnd)
      .split("\n")
      .filter((l) => l.length > 0);

    const isBullet =
      currentLines.length > 0 &&
      currentLines.every(
        (l) => /^-\s+/.test(l.trimStart()) && !/^-\s+\[[ x]\]\s+/.test(l.trimStart())
      );
    const isOrdered =
      currentLines.length > 0 && currentLines.every((l) => /^\d+\.\s+/.test(l.trimStart()));
    const isTask =
      currentLines.length > 0 && currentLines.every((l) => /^-\s+\[[ x]\]\s+/.test(l.trimStart()));
    const isH1 = currentLines.length > 0 && currentLines.every((l) => /^#\s+/.test(l.trimStart()));
    const isH2 = currentLines.length > 0 && currentLines.every((l) => /^##\s+/.test(l.trimStart()));
    const isH3 =
      currentLines.length > 0 && currentLines.every((l) => /^###\s+/.test(l.trimStart()));
    const isQuote =
      currentLines.length > 0 && currentLines.every((l) => /^>\s+/.test(l.trimStart()));

    const selected = value.substring(start, end);
    const before2 = value.substring(Math.max(0, start - 2), start);
    const after2 = value.substring(end, Math.min(value.length, end + 2));
    const before1 = value.substring(Math.max(0, start - 1), start);
    const after1 = value.substring(end, Math.min(value.length, end + 1));

    const isBold =
      (before2 === "**" && after2 === "**") ||
      (selected.startsWith("**") && selected.endsWith("**") && selected.length >= 4);
    const isStrike =
      (before2 === "~~" && after2 === "~~") ||
      (selected.startsWith("~~") && selected.endsWith("~~") && selected.length >= 4);
    const isItalic =
      !isBold &&
      ((before1 === "*" && after1 === "*") ||
        (selected.startsWith("*") &&
          selected.endsWith("*") &&
          selected.length >= 2 &&
          !selected.startsWith("**")));
    const isCode =
      (before1 === "`" && after1 === "`") ||
      (selected.startsWith("`") && selected.endsWith("`") && selected.length >= 2);

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

  const executeAction = React.useCallback(
    (name: string, handler: () => void) => {
      handler();
      onAction?.(name);
      setTimeout(updateActiveFormats, 0);
    },
    [onAction, updateActiveFormats]
  );

  React.useEffect(() => {
    const textarea = getTextarea();
    if (!textarea) return;

    const handleSelection = () => {
      updateActiveFormats();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac =
        typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && !e.shiftKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        executeAction("bold", () => wrapSelection("**", "**", "bold text"));
        return;
      }

      if (modKey && !e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        executeAction("italic", () => wrapSelection("*", "*", "italic text"));
        return;
      }

      if (modKey && !e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        executeAction("inlineCode", () => wrapSelection("`", "`", "code"));
        return;
      }

      if (modKey && !e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        executeAction("link", insertLink);
        return;
      }

      if (modKey && e.shiftKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        executeAction("strikethrough", () => wrapSelection("~~", "~~", "strikethrough text"));
        return;
      }

      if (e.key === "Tab") {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const lineEndIndex = value.indexOf("\n", end);
        const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
        const lines = value.substring(lineStart, lineEnd).split("\n");

        const isListSelection = lines.some((l) => /^\s*(?:-\s+|-\s+\[[ x]\]\s+|\d+\.\s+)/.test(l));

        if (isListSelection || start !== end) {
          e.preventDefault();
          if (e.shiftKey) {
            const outdented = lines.map((l) => l.replace(/^ {1,2}/, ""));
            applyTextMutation(textarea, outdented.join("\n"), "select", lineStart, lineEnd);
          } else {
            const indented = lines.map((l) => `  ${l}`);
            applyTextMutation(textarea, indented.join("\n"), "select", lineStart, lineEnd);
          }
          setTimeout(updateActiveFormats, 0);
          return;
        }
      }

      if (e.key === "Enter" && !e.shiftKey) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        if (start === end) {
          const value = textarea.value;
          const lineStart = value.lastIndexOf("\n", start - 1) + 1;
          const currentLine = value.substring(lineStart, start);

          const emptyBulletMatch = currentLine.match(/^(\s*)-\s+$/);
          const emptyChecklistMatch = currentLine.match(/^(\s*)-\s+\[[ x]\]\s+$/);
          const emptyNumberMatch = currentLine.match(/^(\s*)\d+\.\s+$/);

          if (emptyBulletMatch || emptyChecklistMatch || emptyNumberMatch) {
            e.preventDefault();
            const indent = (emptyBulletMatch || emptyChecklistMatch || emptyNumberMatch)![1];
            applyTextMutation(textarea, indent, "end", lineStart, start);
            setTimeout(updateActiveFormats, 0);
            return;
          }

          const bulletMatch = currentLine.match(/^(\s*)-\s+(.+)$/);
          const checklistMatch = currentLine.match(/^(\s*)-\s+\[[ x]\]\s+(.+)$/);
          const numberMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.+)$/);

          if (checklistMatch) {
            e.preventDefault();
            const indent = checklistMatch[1];
            applyTextMutation(textarea, `\n${indent}- [ ] `, "end");
            setTimeout(updateActiveFormats, 0);
            return;
          } else if (bulletMatch) {
            e.preventDefault();
            const indent = bulletMatch[1];
            applyTextMutation(textarea, `\n${indent}- `, "end");
            setTimeout(updateActiveFormats, 0);
            return;
          } else if (numberMatch) {
            e.preventDefault();
            const indent = numberMatch[1];
            const nextNum = parseInt(numberMatch[2], 10) + 1;
            applyTextMutation(textarea, `\n${indent}${nextNum}. `, "end");
            setTimeout(updateActiveFormats, 0);
            return;
          }
        }
      }
    };

    textarea.addEventListener("select", handleSelection);
    textarea.addEventListener("keyup", handleSelection);
    textarea.addEventListener("mouseup", handleSelection);
    textarea.addEventListener("input", handleSelection);
    textarea.addEventListener("focus", handleSelection);
    textarea.addEventListener("keydown", handleKeyDown);
    document.addEventListener("selectionchange", handleSelection);

    const rafId = requestAnimationFrame(updateActiveFormats);

    return () => {
      cancelAnimationFrame(rafId);
      textarea.removeEventListener("select", handleSelection);
      textarea.removeEventListener("keyup", handleSelection);
      textarea.removeEventListener("mouseup", handleSelection);
      textarea.removeEventListener("input", handleSelection);
      textarea.removeEventListener("focus", handleSelection);
      textarea.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [getTextarea, updateActiveFormats, executeAction, wrapSelection, insertLink]);

  return {
    wrapSelection,
    toggleLinePrefix,
    insertBlock,
    insertTable,
    insertLink,
    insertImage,
    activeFormats,
    executeAction,
    getTextarea,
  };
}
