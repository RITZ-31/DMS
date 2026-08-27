import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App";
import theme from "./theme/theme";

import "./index.css";

import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Toaster position="top-right" />

      <App />
       <ToastContainer />
    </ThemeProvider>

  </React.StrictMode>
);