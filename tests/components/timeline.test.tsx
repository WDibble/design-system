import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIndicator,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from "@/components/ui/timeline";

describe("Timeline Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineConnector />
          <TimelineContent>
            <TimelineTitle>Deployed v2.0</TimelineTitle>
            <TimelineDescription>Edge node routes synchronized</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders titles and descriptions within chronological stream", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Commit verified</TimelineTitle>
            <TimelineDescription>Cryptographic signature valid</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("Commit verified")).toBeInTheDocument();
    expect(screen.getByText("Cryptographic signature valid")).toBeInTheDocument();
  });
});
