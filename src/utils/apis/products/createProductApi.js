import apiClient from "../../../constants/axios-interceptor";

export const createProductApi = async (data) => {
  try {
    return await apiClient.post("/products", data);
  } catch (error) {
    return error;
  }
};

export default createProductApi;
