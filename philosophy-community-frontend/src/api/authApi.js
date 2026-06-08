import axiosInstance from "./axiosInstance";

export const login = async (loginData) => {

    const response =
        await axiosInstance.post(
            "/auth/login",
            loginData
        );

    return response.data;
};

export const getMyInfo = async () => {

    const response =
        await axiosInstance.get(
            "/auth/me"
        );

    return response.data;
};