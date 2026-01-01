import apiClient from "../../../constants/axios-interceptor";

export const updateProductApi = async (id, data) => {
  try {
    return await apiClient.put(`/products/${id}`, data);
  } catch (error) {
    return error;
  }
};

export default updateProductApi;
