import { api } from "../../helpers/helpers";

// GET METHOD
export const getTeachersByPage = (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) =>
    api.get(
        `/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

export const getAllTeachers = () => api.get(`/teachers/getAll`);

export const getTeacherById = (id) =>
    api.get(`/teachers/getSavedTeacherById/${id}`);

// POST METHOD
export const createTeacher = async (payload) =>
    await api.post(`/teachers/save`, payload);

export const chooseLessonTeacher = async (payload) =>
    await api.post(`/teachers/chooseLesson`, payload);

// PUT METHOD
export const updateTeacher = async (userId, payload) => {
    const resp = await api.put(`/teachers/update/${userId}`, payload);
    return resp.data;
};

// DELETE METHOD
export const deleteTeacher = async (id) =>
    await api.delete(`/teachers/delete/${id}`);
