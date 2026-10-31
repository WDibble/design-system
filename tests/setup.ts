import "@testing-library/jest-dom/vitest";
import * as a11yMatchers from "vitest-axe/matchers";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Register custom accessibility matchers globally
expect.extend(a11yMatchers);

// Ensure DOM cleanup between test runs
afterEach(() => {
  cleanup();
});
