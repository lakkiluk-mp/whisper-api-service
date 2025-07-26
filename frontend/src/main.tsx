import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@app/App";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@shared/config/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
