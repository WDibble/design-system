import { SelectionKeycapsCard } from "./selection-keycaps-card";
import { ContextualSurfacesCard } from "./contextual-surfaces-card";
import { ArchitectureExplorerCard } from "./architecture-explorer-card";
import { ActivityStreamCard } from "./activity-stream-card";
import { MarkdownAuthoringCard } from "./markdown-authoring-card";

export function AdvancedPrimitivesShowcase() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      {/* 1. Advanced Selection & Formatting */}
      <SelectionKeycapsCard />

      {/* 2. Contextual Surfaces: ContextMenu, HoverCard & Drawer */}
      <ContextualSurfacesCard />

      {/* 3. Master-Detail Project Architecture Explorer */}
      <ArchitectureExplorerCard />

      {/* 4. Activity Stream & File Staging: Timeline & FileUpload */}
      <ActivityStreamCard />

      {/* 5. Accessible Toolbars & Markdown Authoring Suite */}
      <MarkdownAuthoringCard />
    </div>
  );
}
