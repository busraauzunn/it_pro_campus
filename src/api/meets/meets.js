import { api } from "../../helpers/helpers";

// GET METHOD
export const getMeetsByPage = (
    page = 0,
    size = 20,
    sort = "date",
    type = "page"
) =>
    api.get(`/meet/search?page=${page}&size=${size}&sort=${sort}&type=${type}`);

export const getAllMeetsByStudent = () => api.get(`/meet/getAllMeetByStudent`);

// POST METHOD
export const createMeet = async (payload) =>
    await api.post(`/meet/save`, payload);

// PUT METHOD
export const updateMeet = async (id, payload) =>
    await api.put(`/meet/update/${id}`, payload);

// DELETE METHOD
export const deleteMeet = async (id) => await api.delete(`/meet/delete/${id}`);
