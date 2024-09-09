import axios from "axios";

export const fetchData = async (ApiKEY, query, page) => {
  const baseURL = "https://api.unsplash.com/search/photos";
  const response = await axios.get(baseURL, {
    params: {
      query: query,
      client_id: ApiKEY,
      per_page: 10,
      page: page,
    },
  });
  return response.data;
};
