import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store/store";
// 0 install  `npm i @fontsource/poppins`
// 0 install  `npm i @fontsource/nunito`
import "@fontsource/poppins"; // 1. Add the CSS
import "@fontsource/nunito"; // 1. Add the CSS

import theme from "./theme"; // 2. Add the theme customized with the Poppins font

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>
);
