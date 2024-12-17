import { api } from "../../helpers/helpers";

// POST METHOD
export const createMessage = async (payload) => {
    const resp = await api.post(`/contactMessages/save`, payload);
    return resp.data;
};

// GET METHOD
export const getAllContactMessagesByPage = async (
    page = 0,
    size = 20,
    sort = "date",
    type = "page"
) => {
    return api.get(
        `/contactMessages/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};
