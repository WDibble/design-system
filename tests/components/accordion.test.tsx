import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

describe("Accordion Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Accordion defaultValue={["section-1"]}>
        <AccordionItem value="section-1">
          <AccordionTrigger>What is the quiet chrome doctrine?</AccordionTrigger>
          <AccordionContent>
            Quiet chrome strips away cosmetic boilerplate and prioritises content hierarchy.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("reveals panel content upon trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="faq">
          <AccordionTrigger>FAQ Question</AccordionTrigger>
          <AccordionContent>Helpful answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole("button", { name: "FAQ Question" });
    await user.click(trigger);

    expect(screen.getByText("Helpful answer")).toBeInTheDocument();
  });
});
