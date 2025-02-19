import { MantineProvider } from "@mantine/core";
import * as React from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <MantineProvider>{children}</MantineProvider>;
};
