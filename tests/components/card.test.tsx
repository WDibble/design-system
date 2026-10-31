import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardInner,
} from "@/components/ui/card";

describe("Card Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Concentric Continuity</CardTitle>
          <CardDescription>Mathematical corner radius alignment.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardInner>
            <p>Nested surface maintaining parallel margins.</p>
          </CardInner>
        </CardContent>
        <CardFooter>
          <span>Directive 6 Verified</span>
        </CardFooter>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders card headers and titles accurately", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Physical Lighting</CardTitle>
        </CardHeader>
      </Card>
    );

    expect(screen.getByText("Physical Lighting")).toBeInTheDocument();
  });
});
