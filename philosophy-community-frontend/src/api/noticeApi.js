import axiosInstance from "./axiosInstance";

export const fetchNotices = async () => {
    const response = await axiosInstance.get("/notices");

    return response.data;
};

export const fetchNoticeDetail = async (noticeId) => {
    const response = await axiosInstance.get(`/notices/${noticeId}`);

    return response.data;
};

export const createNotice = async (noticeData) => {
    const response = await axiosInstance.post("/notices", noticeData);

    return response.data;
};

export const updateNotice = async (noticeId, noticeData) => {
    const response = await axiosInstance.put(`/notices/${noticeId}`, noticeData);

    return response.data;
};

export const deleteNotice = async (noticeId) => {
    const response = await axiosInstance.delete(`/notices/${noticeId}`);

    return response.data;
};
