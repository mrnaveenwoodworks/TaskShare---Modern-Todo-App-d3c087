import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/tailwind.css";
import App from "./App";

// Get the root element from the HTML
const container = document.getElementById("root");

// Create a root for rendering
const root = createRoot(container);

// Render the app wrapped in BrowserRouter for routing
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);