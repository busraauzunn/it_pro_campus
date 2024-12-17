import { api } from "../../helpers/helpers";

// GET METHOD
export const getLessonsByPage = (
    page = 0,
    size = 20,
    sort = "lessonName",
    type = "page"
) =>
    api.get(
        `/lessons/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

export const getAllLessons = () => api.get(`/lessons/getAll`);

// POST METHOD
export const createLesson = async (payload) =>
    await api.post(`/lessons/save`, payload);

// PUT METHOD
export const updateLesson = async (userId, payload) =>
    await api.put(`/lessons/update/${userId}`, payload);

// DELETE METHOD
export const deleteLesson = async (id) =>
    await api.delete(`/lessons/delete/${id}`);
