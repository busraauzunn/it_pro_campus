import { api } from "../../helpers/helpers";

// GET METHOD
export const getViceDeansByPage = (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) =>
    api.get(
        `/vicedean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

// POST METHOD
export const createViceDean = async (payload) =>
    await api.post(`/vicedean/save`, payload);

// PUT METHOD
export const updateViceDean = async (userId, payload) =>
    await api.put(`/vicedean/update/${userId}`, payload);

// DELETE METHOD
export const deleteViceDean = async (id) =>
    await api.delete(`/vicedean/delete/${id}`);
