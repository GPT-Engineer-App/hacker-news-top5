import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  newTheme: {
    900: "#0d3b66",
    800: "#145da0",
    700: "#1e81b0",
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.800" : "gray.100",
      color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
      transition: "background-color 0.2s",
    },
    "*::placeholder": {
      color: props.colorMode === "dark" ? "whiteAlpha.400" : "gray.400",
    },
    "*, *::before, &::after": {
      borderColor: props.colorMode === "dark" ? "whiteAlpha.300" : "gray.200",
      wordWrap: "break-word",
    },
  }),
};

const theme = extendTheme({ colors, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);