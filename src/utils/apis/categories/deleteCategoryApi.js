import apiClient from "../../../constants/axios-interceptor";

export const deleteCategoryApi = async (id) => {
  try {
    return await apiClient.delete(`/categories/${id}`);
  } catch (error) {
    return error;
  }
};

export default deleteCategoryApi;
