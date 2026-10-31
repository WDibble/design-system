import "@testing-library/jest-dom/vitest";
import * as a11yMatchers from "vitest-axe/matchers";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Register custom accessibility matchers globally
expect.extend(a11yMatchers);

// Global mock for ResizeObserver in jsdom environment
if (typeof window !== "undefined") {
  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = window.ResizeObserver || MockResizeObserver;
  global.ResizeObserver = global.ResizeObserver || MockResizeObserver;

  // Web Animations API polyfill for jsdom
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => [];
  }
}

// Ensure DOM cleanup between test runs
afterEach(() => {
  cleanup();
});
