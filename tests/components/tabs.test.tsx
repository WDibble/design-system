import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsIndicator, TabsContent } from "@/components/ui/tabs";

describe("Tabs Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsIndicator />
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account Settings</TabsContent>
        <TabsContent value="password">Password Management</TabsContent>
      </Tabs>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("switches tab content on user click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsIndicator />
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">Profile Details</TabsContent>
        <TabsContent value="billing">Billing Invoices</TabsContent>
      </Tabs>
    );

    const billingTab = screen.getByRole("tab", { name: "Billing" });
    await user.click(billingTab);
    expect(screen.getByText("Billing Invoices")).toBeInTheDocument();
  });
});
