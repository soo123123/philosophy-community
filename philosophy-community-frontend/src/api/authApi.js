import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://localhost:8080/api/auth";

export const login = async (loginData) => {
    const response =
        await axiosInstance.post(
            "/auth/login",
            loginData
        );

    return response.data;
};