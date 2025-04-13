import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Router";
import AuthProvider from "./provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            // Define default options
            duration: 2000,

            removeDelay: 1000,
          }}
          reverseOrder={false}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
