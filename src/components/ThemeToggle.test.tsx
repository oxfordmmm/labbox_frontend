import { render, screen } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";
import userEvent from "@testing-library/user-event";
import { useTheme } from "@/components/ThemeProvider";
import { describe, expect, it, vi, Mock } from "vitest";

// Mock the useTheme hook
vi.mock("@/components/ThemeProvider", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle", () => {
  it("should render the ThemeToggle component", () => {
    const setTheme = vi.fn();
    (useTheme as Mock).mockReturnValue({ setTheme });

    render(<ThemeToggle />);

    // Check if the button is rendered
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it("should set the theme to light when Light is clicked", async () => {
    const setTheme = vi.fn();
    (useTheme as Mock).mockReturnValue({ setTheme });

    render(<ThemeToggle />);

    // Open the dropdown menu
    const button = screen.getByRole("button", { name: /toggle theme/i });
    await userEvent.click(button);

    // Click on the Light option
    const lightOption = screen.getByText("Light");
    await userEvent.click(lightOption);

    // Check if setTheme was called with "light"
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("should set the theme to dark when Dark is clicked", async () => {
    const setTheme = vi.fn();
    (useTheme as Mock).mockReturnValue({ setTheme });

    render(<ThemeToggle />);

    // Open the dropdown menu
    const button = screen.getByRole("button", { name: /toggle theme/i });
    await userEvent.click(button);

    // Click on the Dark option
    const darkOption = screen.getByText("Dark");
    await userEvent.click(darkOption);

    // Check if setTheme was called with "dark"
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("should set the theme to system when System is clicked", async () => {
    const setTheme = vi.fn();
    (useTheme as Mock).mockReturnValue({ setTheme });

    render(<ThemeToggle />);

    // Open the dropdown menu
    const button = screen.getByRole("button", { name: /toggle theme/i });
    await userEvent.click(button);

    // Click on the System option
    const systemOption = screen.getByText("System");
    await userEvent.click(systemOption);

    // Check if setTheme was called with "system"
    expect(setTheme).toHaveBeenCalledWith("system");
  });
});
