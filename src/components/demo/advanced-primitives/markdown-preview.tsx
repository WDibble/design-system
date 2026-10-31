import * as React from "react";

export function SimpleMarkdownPreview({ content }: { content: string }) {
  const lines = content.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      const [header, _, ...bodyRows] = tableRows;
      renderedElements.push(
        <div
          key={`table-${key}`}
          className="my-2.5 overflow-x-auto rounded-lg border border-border/70"
        >
          <table className="w-full text-left text-xs">
            {header && (
              <thead className="border-b border-border/70 bg-muted/40">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="px-3 py-1.5 text-[11px] font-semibold text-foreground">
                      {col.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/20"
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-1 text-[11px] text-muted-foreground">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      const cells = line.trim().slice(1, -1).split("|");
      tableRows.push(cells);
      return;
    } else if (inTable) {
      flushTable(index);
    }

    if (line.startsWith("# ")) {
      renderedElements.push(
        <h2 key={index} className="mt-2 mb-1 text-base font-bold tracking-tight text-foreground">
          {line.replace("# ", "")}
        </h2>
      );
    } else if (line.startsWith("## ")) {
      renderedElements.push(
        <h3 key={index} className="mt-2 mb-1 text-sm font-semibold tracking-tight text-foreground">
          {line.replace("## ", "")}
        </h3>
      );
    } else if (line.startsWith("### ")) {
      renderedElements.push(
        <h4
          key={index}
          className="mt-2 mb-0.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          {line.replace("### ", "")}
        </h4>
      );
    } else if (line.startsWith("> ")) {
      renderedElements.push(
        <blockquote
          key={index}
          className="my-1.5 rounded-r-md border-l-2 border-primary/80 bg-muted/20 py-1 pl-3 text-xs text-muted-foreground italic"
        >
          {line.replace("> ", "")}
        </blockquote>
      );
    } else if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
      const checked = line.startsWith("- [x] ");
      const text = line.replace(/- \[[ x]\] /, "");
      renderedElements.push(
        <div key={index} className="my-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="pointer-events-none size-3.5 rounded accent-primary"
          />
          <span className={checked ? "line-through opacity-70" : "text-foreground"}>{text}</span>
        </div>
      );
    } else if (line.startsWith("- ")) {
      renderedElements.push(
        <li key={index} className="my-0.5 ml-4 list-disc text-xs text-muted-foreground">
          {line.replace("- ", "")}
        </li>
      );
    } else if (line.trim() === "---") {
      renderedElements.push(<hr key={index} className="my-2 border-border/50" />);
    } else if (line.trim().length > 0) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      renderedElements.push(
        <p key={index} className="my-1 text-xs leading-relaxed text-muted-foreground">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-foreground">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    }
  });

  if (inTable) flushTable(lines.length);

  return <div className="space-y-1 text-left">{renderedElements}</div>;
}
