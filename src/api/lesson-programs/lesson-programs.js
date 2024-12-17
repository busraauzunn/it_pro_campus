import { api } from "../../helpers/helpers";

// GET METHOD
export const getAllLessonPrograms = () => api.get("/lessonPrograms/getAll");

export const getLessonProgramsByStudent = () =>
    api.get("/lessonPrograms/getLessonProgramByStudent");

export const getAllUnAssignedLessonPrograms = () =>
    api.get(`/lessonPrograms/getAllUnassigned`);

export const getLessonProgramsByTeacher = () =>
    api.get(`/lessonPrograms/getAllLessonProgramByTeacher`);

export const getLessonProgramsByPage = (
    page = 0,
    size = 20,
    sort = "day",
    type = "page"
) =>
    api.get(
        `/lessonPrograms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

// POST METHOD
export const createLessonProgram = async (payload) =>
    await api.post(`/lessonPrograms/save`, payload);

// PUT METHOD
export const updateLessonProgram = async (userId, payload) =>
    await api.put(`/lessonPrograms/update/${userId}`, payload);

// DELETE METHOD
export const deleteLessonProgram = async (id) =>
    await api.delete(`/lessonPrograms/delete/${id}`);
