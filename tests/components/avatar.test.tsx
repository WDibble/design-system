import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
} from "@/components/ui/avatar";

describe("Avatar Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback autoColor>AG</AvatarFallback>
        <AvatarBadge status="online" />
      </Avatar>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders fallback text correctly when image is loading or absent", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});
