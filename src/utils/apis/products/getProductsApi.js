import apiClient from "../../../constants/axios-interceptor";

export const getProductsApi = async (offset = null, limit = null) => {
  try {
    let url = "/products";
    const params = [];

    if (offset != null) {
      params.push(`offset=${offset}`);
    }
    if (limit != null) {
      params.push(`limit=${limit}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    return await apiClient.get(url);
  } catch (error) {
    return error;
  }
};

export default getProductsApi;
