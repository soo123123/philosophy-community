import axiosInstance from "./axiosInstance";

export const addReaction = async (postId) => {
    const response = await axiosInstance.post(`/posts/${postId}/reactions`);

    return response.data;
};

export const removeReaction = async (postId) => {
    const response = await axiosInstance.delete(`/posts/${postId}/reactions`);

    return response.data;
};

export const fetchReactionCount = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/reactions/count`);

    return response.data;
};
