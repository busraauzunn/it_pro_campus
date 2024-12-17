import { api } from "../../helpers/helpers";

// GET METHOD
export const getDeansByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) => {
    return api.get(
        `/dean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

// POST METHOD
export const createDean = async (dean) => {
    return api.post("/dean/save", dean);
};

// PUT METHOD
export const updateDean = async (deanId, payload) => {
    return api.put(`/dean/update/${deanId}`, payload);
};

// DELETE METHOD
export const deleteDean = async (deanId) => {
    return api.delete(`/dean/delete/${deanId}`);
};
