import axiosInstance from "./axiosInstance";

export const getPosts = async () => {
    const response = await axiosInstance.get(
        "/posts"
    );

    return response.data;
};

export const getPostsByCategory = async (categoryId) => {
    const response = await axiosInstance.get(
        `/categories/${categoryId}/posts`
    );

    return response.data;
};

export const getPost = async (postId) => {
    const response = await axiosInstance.get(
        `/posts/${postId}`
    );

    return response.data;
};

export const createPost = async (postData) => {

    const response = await axiosInstance.post(
        "/posts",
        postData
    );

    return response.data;
};

export const updatePost = async (postId, postData) => {

    const response = await axiosInstance.put(
        `/posts/${postId}`,
        postData
    );

    return response.data;
};

export const deletePost = async (postId) => {

    const response = await axiosInstance.delete(
        `/posts/${postId}`
    );

    return response.data;
};
