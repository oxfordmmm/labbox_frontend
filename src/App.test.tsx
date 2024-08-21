import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import { App } from "./App";

describe("App", () => {
  it("renders Navbar", () => {
    render(<App />, { wrapper: BrowserRouter });
    screen.debug(undefined, Infinity);
    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });
  it("renders Home Page", () => {
    render(<App />, { wrapper: BrowserRouter });
    const homePageElement = screen.getByTestId("homepage");
    expect(homePageElement).toBeInTheDocument();
  });
  it("Renders 'not found' page if invalid path", async () => {
    render(
      <MemoryRouter initialEntries={["/invalid"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      const notFoundElement = screen.getByText("404 Not Found");
      expect(notFoundElement).toBeInTheDocument();
    });
  });
});
