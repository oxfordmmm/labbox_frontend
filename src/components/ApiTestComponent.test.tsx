import { render, screen, waitFor } from "@testing-library/react";
import ApiTestComponent from "./ApiTestComponent";
import { it, expect, describe, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/vitest";

const mockapi = new MockAdapter(axios);

describe("ApiTestComponent", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    console.log("Resetting mock and query client before each test");
    mockapi.reset();
    queryClient = new QueryClient();
  });

  afterEach(() => {
    console.log("Resetting mock and query client after each test");
    mockapi.reset();
    queryClient.clear();
  });

  it("should display the mock API response", async () => {
    console.log("Setting up mock for successful response");
    mockapi.onGet("/api").reply(200, { data: "Hello, world!" });

    render(
      <QueryClientProvider client={queryClient}>
        <ApiTestComponent />
      </QueryClientProvider>
    );

    await waitFor(() => {
      console.log("Waiting for successful response");
      expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });
  });

  it("should display an error message on API failure", async () => {
    console.log("Setting up mock for error response");
    mockapi.onGet("/api").reply(400);

    render(
      <QueryClientProvider client={queryClient}>
        <ApiTestComponent />
      </QueryClientProvider>
    );

    await waitFor(() => {
      console.log("Waiting for error response");
      expect(screen.getByText("Error fetching data")).toBeInTheDocument();
    });
  });

  it("should display loading state initially", async () => {
    console.log("Setting up mock for loading state");
    mockapi.onGet("/api").reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, { data: "Hello, world!" }]);
        }, 1000);
      });
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ApiTestComponent />
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      console.log("Waiting for successful response after loading");
      expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });
  });
});
