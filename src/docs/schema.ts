import { z } from "zod";

export const componentSiblingRuleSchema = z.object({
  primitive: z.string().min(1),
  reason: z.string().min(8),
});

export const componentDoDontSchema = z.object({
  do: z.string().min(8),
  dont: z.string().min(8),
});

export const componentSpecSchema = z.object({
  slug: z.string().min(1),
  definingConstraint: z.string().min(20),
  whenToUse: z.array(z.string().min(8)).min(2).max(4),
  whenNotToUse: z.array(componentSiblingRuleSchema).min(1).max(4),
  anatomy: z.string().min(4),
  a11yContract: z.array(z.string().min(8)).min(2).max(4),
  doAndDont: z.array(componentDoDontSchema).min(2).max(4),
  slotsAndPairing: z.string().min(12),
  exampleExport: z.string().min(1),
  exampleFile: z.string().min(1),
});

export type ComponentSiblingRule = z.infer<typeof componentSiblingRuleSchema>;
export type ComponentDoDont = z.infer<typeof componentDoDontSchema>;
export type ComponentSpec = z.infer<typeof componentSpecSchema>;
