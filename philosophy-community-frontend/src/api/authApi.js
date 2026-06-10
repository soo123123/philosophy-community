import axiosInstance from "./axiosInstance";

export const loginUser = async (loginData) => {

    const response =
        await axiosInstance.post(
            "/auth/login",
            loginData
        );

    return response.data;
};

export const signupUser = async (signupData) => {

    const response =
        await axiosInstance.post(
            "/auth/signup",
            signupData
        );

    return response.data;
};

export const getMyProfile = async () => {

    const response =
        await axiosInstance.get(
            "/users/me"
        );

    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("accessToken");
};

export const login = loginUser;
export const getMyInfo = getMyProfile;
