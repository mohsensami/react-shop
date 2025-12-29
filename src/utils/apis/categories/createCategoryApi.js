import apiClient from "../../../constants/axios-interceptor";

export const createCategoryApi = async (data) => {
  try {
    return await apiClient.post("/categories", data);
  } catch (error) {
    return error;
  }
};

export default createCategoryApi;
