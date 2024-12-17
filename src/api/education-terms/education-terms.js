import { api } from "../../helpers/helpers";

// GET METHOD
export const getEducationTermsByPage = (
    page = 0,
    size = 20,
    sort = "startDate",
    type = "page"
) =>
    api.get(
        `/educationTerms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

export const getAllEducationTerms = () => api.get(`/educationTerms/getAll`);

// POST METHOD
export const createEducationTerm = async (payload) =>
    await api.post(`/educationTerms`, payload);

// DELETE METHOD
export const deleteEducationTerm = async (id) =>
    await api.delete(`/educationTerms/${id}`);
