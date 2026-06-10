import axiosInstance from "./axiosInstance";

export const getComments = async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);

    return response.data;
};

export const createComment = async (postId, commentData) => {
    const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        commentData
    );

    return response.data;
};

export const updateComment = async (commentId, commentData) => {
    const response = await axiosInstance.put(
        `/comments/${commentId}`,
        commentData
    );

    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await axiosInstance.delete(`/comments/${commentId}`);

    return response.data;
};
