import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router/router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
