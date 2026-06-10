import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
    const response = await axiosInstance.get("/categories");

    return response.data;
};

export const getCategory = async (categoryId) => {
    const response = await axiosInstance.get(`/categories/${categoryId}`);

    return response.data;
};
