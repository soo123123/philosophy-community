import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getPosts = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/api/posts`
    );

    return response.data;
};