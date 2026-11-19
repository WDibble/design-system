import type { ComponentSpec } from "@/docs/schema";
import { actionsTogglesSpecs } from "./actions-toggles";
import { dataFeedbackSpecs } from "./data-feedback";
import { docsSchematicsSpecs } from "./docs-schematics";
import { formsInputSpecs } from "./forms-input";
import { navigationMenusSpecs } from "./navigation-menus";
import { overlaysSurfacesSpecs } from "./overlays-surfaces";

export const COMPONENT_SPECS: Record<string, ComponentSpec> = {
  ...actionsTogglesSpecs,
  ...formsInputSpecs,
  ...navigationMenusSpecs,
  ...overlaysSurfacesSpecs,
  ...dataFeedbackSpecs,
  ...docsSchematicsSpecs,
};
