import apiClient from "../../../constants/axios-interceptor";

export const getCategoriesApi = async (limit = null) => {
  try {
    let url = "/categories";
    if (limit != null) {
      url += `?limit=${limit}`;
    }
    return await apiClient.get(url);
  } catch (error) {
    return error;
  }
};

export default getCategoriesApi;
