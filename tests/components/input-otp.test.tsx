import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

describe("InputOTP Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        Verification Code
        <InputOTP maxLength={6} aria-label="One-time verification code">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles numeric code input typing", async () => {
    const user = userEvent.setup();
    render(
      <InputOTP maxLength={4} aria-label="PIN code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = screen.getByRole("textbox", { name: "PIN code" });
    await user.type(input, "1234");
    expect(input).toHaveValue("1234");
  });
});
