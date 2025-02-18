import ReactDOM from "react-dom/client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

// import CssBaseline from "@mui/material/CssBaseline";
import "@mantine/core/styles.css";
import React from "react";
// import App from "./App";
import { Box } from "@mantine/core";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: { refetchOnWindowFocus: false },
//   },
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <QueryClientProvider client={queryClient}> */}
    <MantineProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      {/* <App /> */}
      <Box display={"flex"} bg={"red"} />
    </MantineProvider>
    {/* </QueryClientProvider>, */}
  </>,
);
