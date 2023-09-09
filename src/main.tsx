import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./pages/Home.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
