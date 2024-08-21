// testUtils.tsx
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/**
 * The props for the QueryClientWrapper component
 */
interface QueryClientWrapperProps {
  children: ReactNode;
}

/**
 * A wrapper component that provides the query client to its children
 */
const QueryClientWrapper: React.FC<QueryClientWrapperProps> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export { QueryClientWrapper };
