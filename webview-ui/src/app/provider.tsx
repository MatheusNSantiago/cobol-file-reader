import { MantineThemeProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryConfig } from "../lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(() => {
    return new QueryClient({ defaultOptions: queryConfig });
  });

  return (
    <MantineThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineThemeProvider>
  );
};
