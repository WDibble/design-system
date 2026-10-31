import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

describe("Field Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants with label and description", async () => {
    const { container } = render(
      <Field>
        <FieldLabel>Full Name</FieldLabel>
        <Input placeholder="John Doe" />
        <FieldDescription>As shown on official identification.</FieldDescription>
      </Field>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders validation error state cleanly", () => {
    render(
      <Field invalid>
        <FieldLabel requiredIndicator>Email Address</FieldLabel>
        <Input placeholder="user@company.com" />
        <FieldError match={true}>Invalid corporate domain provided.</FieldError>
      </Field>
    );

    expect(screen.getByText("Invalid corporate domain provided.")).toBeInTheDocument();
  });
});
