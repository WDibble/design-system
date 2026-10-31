import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { FileUpload } from "@/components/ui/file-upload";

describe("FileUpload Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <FileUpload
        title="Upload design tokens"
        description="JSON or YAML files up to 10MB"
        aria-label="Upload design tokens file"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders upload title and description", () => {
    render(
      <FileUpload title="Drop asset archives here" description="Supported formats: ZIP, TAR, GZ" />
    );

    expect(screen.getByText("Drop asset archives here")).toBeInTheDocument();
    expect(screen.getByText("Supported formats: ZIP, TAR, GZ")).toBeInTheDocument();
  });
});
