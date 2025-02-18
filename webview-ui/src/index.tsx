import "./App.css";
import React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";
import { AppProvider } from "./app/provider";
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
