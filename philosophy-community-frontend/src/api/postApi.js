import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getPosts = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/api/posts`
    );

    return response.data;
};

export const getPost = async (postId) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/posts/${postId}`
    );

    return response.data;
};

export const createPost = async (postData) => {

    const response = await axios.post(
        `${API_BASE_URL}/api/posts`,
        postData
    );

    return response.data;
};

export const updatePost = async (postId, postData) => {

    const response = await axios.put(
        `${API_BASE_URL}/api/posts/${postId}`,
        postData
    );

    return response.data;
};

export const deletePost = async (postId) => {

    const response = await axios.delete(
        `${API_BASE_URL}/api/posts/${postId}`
    );

    return response.data;
};