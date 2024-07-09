import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function useAuth0Api() {
  const { getAccessTokenSilently } = useAuth0();

  const api = axios.create({
    baseURL: "/api", // replace with your API base URL
  });

  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
}

export default useAuth0Api;
