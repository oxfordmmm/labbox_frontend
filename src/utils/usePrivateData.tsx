import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import useAuth0Api from "./useAuth0Api";

function usePrivateData() {
  const api = useAuth0Api();

  const options: UseQueryOptions<unknown, Error> = {
    queryKey: ["privateData"],
    queryFn: async () => {
      const response: { data: unknown } = await api.get("/private");
      const { data } = response;
      return data;
    },
  };

  return useQuery(options);
}

export default usePrivateData;
