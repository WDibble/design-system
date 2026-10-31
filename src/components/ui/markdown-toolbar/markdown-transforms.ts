/**
 * Perform a selection-aware text mutation on a HTMLTextAreaElement while preserving
 * the browser native undo/redo stack via setRangeText and synchronising React controlled state.
 */
export function applyTextMutation(
  textarea: HTMLTextAreaElement,
  replacement: string,
  selectionMode: "select" | "start" | "end" | "preserve" = "select",
  customStart?: number,
  customEnd?: number
) {
  const start = customStart ?? textarea.selectionStart;
  const end = customEnd ?? textarea.selectionEnd;
  const scrollTop = textarea.scrollTop;

  textarea.focus();
  // Using setRangeText preserves the browser undo/redo history in modern engines
  textarea.setRangeText(replacement, start, end, selectionMode);

  // Synchronise React controlled state via native prototype value setter descriptor
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  )?.set;
  if (nativeSetter) {
    nativeSetter.call(textarea, textarea.value);
  }

  // Dispatch synthetic input event for React controlled state synchronisation
  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  textarea.scrollTop = scrollTop;
}

/**
 * Strip competing structural block prefixes (headings, bullet, checklist, ordered numbers)
 */
export function stripStructuralPrefix(line: string) {
  const match = line.match(/^(\s*)(?:#{1,6}\s+|-\s+\[[ x]\]\s+|-\s+|\d+\.\s+)?(.*)$/);
  if (!match) return { indent: "", content: line };
  return { indent: match[1], content: match[2] };
}
