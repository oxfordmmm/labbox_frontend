import { Auth0Provider } from "@auth0/auth0-react";
import * as React from "react";
import { createRoot } from "react-dom/client";

import { WrappedApp } from "./App";

import "./index.css";

/**
 * Define an interface to represent the app state
 */
interface AppState {
  returnTo?: string;
}

/**
 * Configure Auth0Provider with React Router v6
 * @param appState The app state
 */
const onRedirectCallback = (appState?: AppState) => {
  window.history.pushState(
    {},
    document.title,
    appState?.returnTo ?? window.location.pathname
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN as string}
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE as string | undefined,
      }}
    >
      <WrappedApp />
    </Auth0Provider>
  </React.StrictMode>
);
