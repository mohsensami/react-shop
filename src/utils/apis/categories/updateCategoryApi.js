import apiClient from "../../../constants/axios-interceptor";

export const updateCategoryApi = async (id, data) => {
  try {
    return await apiClient.put(`/categories/${id}`, data);
  } catch (error) {
    return error;
  }
};

export default updateCategoryApi;
