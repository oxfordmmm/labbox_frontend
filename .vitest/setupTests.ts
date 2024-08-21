import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import MockAdapter from "axios-mock-adapter";

import {
  Auth0ContextInterface,
  withAuthenticationRequired as originalWithAuthenticationRequired,
} from "@auth0/auth0-react";

import api from "@/utils/api";

expect.extend(matchers);

// Mock matchMedia because it is not available in jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// Define a type for the actual object
type Auth0Module = {
  useAuth0: () => Auth0ContextInterface;
  withAuthenticationRequired: typeof originalWithAuthenticationRequired;
};

// Mock useAuth0 and withAuthenticationRequired
vi.mock(
  "@auth0/auth0-react",
  async (importOriginal: () => Promise<Auth0Module>) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useAuth0: () => ({
        isLoading: false,
        error: null,
      }),
      withAuthenticationRequired: (component: React.ComponentType) => component,
    };
  }
);

const mockapi = new MockAdapter(api);

mockapi.onGet("/api").reply(200, { data: "Hello, world!" });

export { mockapi };
