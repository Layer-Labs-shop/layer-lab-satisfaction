import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles.css";

// Use the same base path as Vite so React Router works under /REPO_NAME/ on GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

// Restore the path the user originally hit before the GitHub Pages 404.html redirect.
const redirect = sessionStorage.getItem("spa-redirect");
if (redirect) {
  sessionStorage.removeItem("spa-redirect");
  const stripped = redirect.startsWith(basename)
    ? redirect.slice(basename.length) || "/"
    : redirect;
  if (stripped !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, "", basename + stripped.replace(/^\//, ""));
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
