import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://localhost:8080";

export const getPosts = async () => {
    const response = await axiosInstance.get(
        `${API_BASE_URL}/api/posts`
    );

    return response.data;
};

export const getPost = async (postId) => {
    const response = await axiosInstance.get(
        `${API_BASE_URL}/api/posts/${postId}`
    );

    return response.data;
};

export const createPost = async (postData) => {

    const response = await axiosInstance.post(
        `${API_BASE_URL}/api/posts`,
        postData
    );

    return response.data;
};

export const updatePost = async (postId, postData) => {

    const response = await axiosInstance.put(
        `${API_BASE_URL}/api/posts/${postId}`,
        postData
    );

    return response.data;
};

export const deletePost = async (postId) => {

    const response = await axiosInstance.delete(
        `${API_BASE_URL}/api/posts/${postId}`
    );

    return response.data;
};