import apiClient from "../../../constants/axios-interceptor";

export const getRelatedProducts = async (id) => {
  try {
    return await apiClient.get(`/products/${id}/related`);
  } catch (error) {
    return error;
  }
};

export default getRelatedProducts;
