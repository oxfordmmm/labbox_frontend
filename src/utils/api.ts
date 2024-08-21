import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const api = axios.create({
  baseURL: "/api",
});

const configureApi = (getAccessTokenSilently: () => Promise<string>) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

// Custom hook to initialize the API
export const useInitializeApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    configureApi(getAccessTokenSilently);
  }, [getAccessTokenSilently]);
};

export default api;
