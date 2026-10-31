import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "@/components/ui/pagination";

describe("Pagination Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles page change clicks", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
