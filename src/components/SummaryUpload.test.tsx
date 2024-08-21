import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import SummaryUpload from "@/components/SummaryUpload";
import { useNavigate } from "react-router-dom";
import { useUploadData } from "@/store/useStore";
import { QueryClientWrapper } from "@/utils/testUtils";
import userEvent from "@testing-library/user-event";

import { fileSummary, fileMapping } from "@/testdata/mockedFiles";
import { mockapi } from "root/.vitest/setupTests";

// Mock dependencies
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@/store/useStore", () => ({
  useUploadData: vi.fn(),
}));

// Mock the readCSV function
vi.mock("@/lib/utils", async () => {
  const originalModule = await vi.importActual("@/lib/utils");
  return {
    ...originalModule,
    readCSV: vi.fn().mockResolvedValue([{ id: 1, name: "Test" }]),
  };
});

mockapi.onPost("/summary/upload").reply(200, {
  status: "success",
  data: [
    {
      type: "Summary Upload",
      msg: "Excel uploaded successfully",
      logs: [],
    },
  ],
});

describe("SummaryUpload", () => {
  const mockNavigate = vi.fn();
  const mockUploadData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useUploadData as Mock).mockReturnValue(mockUploadData);
    mockapi.resetHistory();
  });

  it("should render the component with initial states", async () => {
    render(
      <QueryClientWrapper>
        <SummaryUpload />
      </QueryClientWrapper>
    );

    expect(screen.getByText(/Upload Summary/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload/i })).toBeDisabled();
  });

  it("should update state on file selection", async () => {
    render(
      <QueryClientWrapper>
        <SummaryUpload />
      </QueryClientWrapper>
    );

    const summaryFileInput = screen.getByLabelText(
      /Summary File/i
    ) as HTMLInputElement;
    const mappingFileInput = screen.getByLabelText(
      /Mapping File/i
    ) as HTMLInputElement;

    const file = new File(["dummy content"], "example.csv", {
      type: "text/csv",
    });

    userEvent.upload(summaryFileInput, file);
    userEvent.upload(mappingFileInput, file);

    await waitFor(() => {
      expect(summaryFileInput.files).not.toBeNull();
      expect(mappingFileInput.files).not.toBeNull();
      if (summaryFileInput.files && mappingFileInput.files) {
        expect(summaryFileInput.files[0]).toBe(file);
        expect(mappingFileInput.files[0]).toBe(file);
      }
    });
  });

  it(
    "should handle form submission and mutation",
    async () => {
      render(
        <QueryClientWrapper>
          <SummaryUpload />
        </QueryClientWrapper>
      );

      const summaryFileInput = screen.getByLabelText(
        /Summary File/i
      ) as HTMLInputElement;
      const mappingFileInput = screen.getByLabelText(
        /Mapping File/i
      ) as HTMLInputElement;
      const uploadButton = screen.getByRole("button", {
        name: /Upload/i,
      }) as HTMLButtonElement;

      userEvent.upload(summaryFileInput, fileSummary);
      userEvent.upload(mappingFileInput, fileMapping);

      await waitFor(() => {
        expect(uploadButton).not.toBeDisabled();
      });

      // Add a console log to check if the button is enabled
      console.log("Upload button enabled:", !uploadButton.disabled);

      try {
        await userEvent.click(uploadButton);
      } catch (error) {
        console.error("Error clicking upload button:", error);
      }

      // Add logging to check if the API call is made
      console.log("Checking if mock API post was called...");

      // Check if the mock API was called
      await waitFor(
        () => {
          console.log(
            "mockapi.history.post.length:",
            mockapi.history.post.length
          );
          expect(mockapi.history.post.length).toBe(1);
        },
        { timeout: 10000 }
      );

      // Optionally, check the details of the request
      const request = mockapi.history.post[0];
      expect(request.url).toBe("/summary/upload");
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/upload-result");
      });

      // // Simulate failed mutation
      // mockApi.post.mockRejectedValueOnce(new Error("Upload failed"));

      // await userEvent.click(uploadButton);

      // await waitFor(() => {
      //   expect(screen.getByText(/Upload failed/i)).toBeInTheDocument();
      // });
    },
    { timeout: 20000 }
  );
});
