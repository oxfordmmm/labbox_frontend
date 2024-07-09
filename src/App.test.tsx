import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App, WrappedApp } from "./App";

describe("App", () => {
  it("renders Navbar", () => {
    render(<WrappedApp />);
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();
  });
  it("renders Home Page", () => {
    render(<WrappedApp />);
    const homePageElement = screen.getByText(/HomePage/i);
    expect(homePageElement).toBeInTheDocument();
  });
  it("Renders not found if invalid path", () => {
    render(
      <MemoryRouter initialEntries={["/invalid"]}>
        <App />
      </MemoryRouter>
    );
    const notFoundElement = screen.getByText(/NotFound/i);
    expect(notFoundElement).toBeInTheDocument();
  });
});
