import { api } from "../../helpers/helpers";

// GET METHOD
export const getAdminsByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) => {
    return await api.get(
        `/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );
};

// POST METHOD
export const createAdmin = async (payload) => {
    const response = await api.post("/admin/save", payload);
    return response.data;
};

// DELETE METHOD
export const deleteAdmin = async (id) => {
    const response = await api.delete(`/admin/delete/${id}`);
    return response.data;
};
