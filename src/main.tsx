// main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import Home from "./pages/Home";
import MonthDetails from "./pages/MonthDetails";
import "./theme.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/month/:id" element={<MonthDetails />} />
      </Routes>
    </Router>
  </Provider>
);
