import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Page1 } from "./Page1.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<App />} />
      <Route path="/page-1" element={<Page1 />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
