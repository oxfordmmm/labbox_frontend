import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchApiData = async () => {
  try {
    const response = await axios.get("/api");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

const ApiTestComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["apiData"],
    queryFn: fetchApiData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return <div>{data.data}</div>;
};

export default ApiTestComponent;
