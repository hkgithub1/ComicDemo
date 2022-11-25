import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.js";
import HomePage from "./HomePage.js";
import SearchPage from "./SearchPage.js";
import BookMainPage from "./BookMainPage.js";
import CheckoutPage from "./CheckoutPage.js";
import DatePage from "./DatePage.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import AccountPage from "./AccountPage.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Inventory from "./Inventory.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="search/" element={<SearchPage />} />
            <Route path="book/" element={<BookMainPage />} />
            <Route path="book/:id" element={<BookMainPage />} />
            <Route path="checkout/" element={<CheckoutPage />} />
            <Route path="date/" element={<DatePage />} />
            <Route path="login/" element={<Login />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="account/" element={<AccountPage />} />
            <Route path="inventory/" element={<Inventory />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

const theme = createTheme({
  typography: {
    fontFamily: ["Manrope"].join(","),

    fontSize: 16,

    button: {
      textTransform: "none",
    },
  },

  input: {
    color: "white",
  },

  palette: {
    primary: {
      main: "#24248f",
    },

    secondary: {
      main: "#cc9900",
    },

    tertiary: {
      main: "#004d00",
    },

    black: {
      main: "#0d0d0d",
      light: "#404040",
    },

    background: {
      main: "#e6e6e6",
      secondary: "#262626",
      tertiary: "#404040",
      transparent: "#ffffff00",
      white: "#ffffff",
    },

    text: {
      white: "#ffffff",
      gray: "#bfbfbf",
      darkgray: "#808080",
    },
  },
});
