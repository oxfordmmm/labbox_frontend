import { render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { describe, it, expect, beforeEach } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set the default theme to system", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(
      await screen.getByText(/current theme: system/i)
    ).toBeInTheDocument();
  });

  it("should change the theme and store it in localStorage", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = await screen.getByRole("button", {
      name: /set theme to dark/i,
    });
    await button.click();

    expect(await screen.getByText(/current theme: dark/i)).toBeInTheDocument();
    expect(await localStorage.getItem("vite-ui-theme")).toBe("dark");
  });

  it("should provide the correct context values", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = await screen.getByRole("button", {
      name: /set theme to light/i,
    });
    await button.click();

    expect(await screen.getByText(/current theme: light/i)).toBeInTheDocument();
  });
});

function TestComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Set theme to dark</button>
      <button onClick={() => setTheme("light")}>Set theme to light</button>
    </div>
  );
}
