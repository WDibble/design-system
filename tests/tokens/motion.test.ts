import { describe, it, expect } from "vitest";
import { springs, CSS_EASE_SPRING } from "@/tokens/motion";

describe("Motion Tokens and Physics Invariants", () => {
  it("defines physical spring tokens adhering to HIG dynamics", () => {
    expect(springs.tactile).toBeDefined();
    expect(springs.tactile.stiffness).toBeGreaterThan(400);
    expect(springs.tactile.damping).toBeGreaterThan(20);

    expect(springs.dialog).toBeDefined();
    expect(springs.dialog.stiffness).toBeGreaterThan(200);

    expect(springs.snappy).toBeDefined();
    expect(springs.micro).toBeDefined();
    expect(springs.squishy).toBeDefined();
  });

  it("exports CSS spring fallback curve", () => {
    expect(CSS_EASE_SPRING).toContain("linear(");
  });
});
