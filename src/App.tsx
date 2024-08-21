import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MutationUploadPage from "./pages/MutationUploadPage";
import NotFoundPage from "./pages/NotFoundPage";
import SpreadsheetUploadPage from "./pages/SpreadsheetUploadPage";
import SummaryUploadPage from "./pages/SummaryUploadPage";
import UploadResultPage from "./pages/UploadResultPage";
import { useInitializeApi } from "./utils/api";

function App(): JSX.Element {
  useInitializeApi();

  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="runs" element={<NotFoundPage />} />
            <Route path="excel-upload" element={<SpreadsheetUploadPage />} />
            <Route path="mutation-upload" element={<MutationUploadPage />} />
            <Route path="summary-upload" element={<SummaryUploadPage />} />
            <Route path="upload-result" element={<UploadResultPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function WrappedApp(): JSX.Element {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export { App, WrappedApp };
