import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { COMPONENT_EXAMPLE_COMPONENTS } from "@/docs/examples";
import { COMPONENT_SPECS } from "@/docs/specs";
import { componentSpecSchema } from "@/docs/schema";
import { docsManifest } from "@/generated/docs-manifest";

const PRIMITIVE_SLUGS = docsManifest.primitives.map((p) => p.slug);

describe("All 57 Component Specs and Live Examples", () => {
  it("provides valid Zod specs and runnable example components for every exported primitive", () => {
    expect(PRIMITIVE_SLUGS).toHaveLength(57);

    for (const slug of PRIMITIVE_SLUGS) {
      const spec = COMPONENT_SPECS[slug];
      expect(spec, `Missing spec for primitive '${slug}'`).toBeDefined();
      expect(() => componentSpecSchema.parse(spec)).not.toThrow();
      expect(
        COMPONENT_EXAMPLE_COMPONENTS[slug],
        `Missing live example component for primitive '${slug}'`
      ).toBeTypeOf("function");
    }
  });

  it.each(PRIMITIVE_SLUGS)("renders '%s' live example with zero WCAG violations", async (slug) => {
    const ExampleComponent = COMPONENT_EXAMPLE_COMPONENTS[slug];
    const { container } = render(<ExampleComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
