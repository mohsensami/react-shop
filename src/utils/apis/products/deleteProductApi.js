import apiClient from "../../../constants/axios-interceptor";

export const deleteProductApi = async (id) => {
  try {
    return await apiClient.delete(`/products/${id}`);
  } catch (error) {
    return error;
  }
};

export default deleteProductApi;
