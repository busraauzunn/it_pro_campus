import { api } from "../../helpers/helpers";

// GET METHOD
export const getStudentsByPage = (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) =>
    api.get(
        `/students/search?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

export const getAllStudents = () => api.get(`/students/getAll`);

export const getStudentById = (id) =>
    api.get(`/students/getStudentById?id=${id}`);

export const getAllStudentsByAdvisorId = () =>
    api.get(`/students/getAllByAdvisorId`);

// POST METHOD
export const chooseLesson = (payload) =>
    api.post("/students/chooseLesson", payload);

export const createStudent = (payload) => api.post(`/students/save`, payload);

// PUT METHOD
export const updateStudent = async (userId, payload) =>
    await api.put(`/students/update/${userId}`, payload);

// DELETE METHOD
export const deleteStudent = (id) => api.delete(`/students/delete/${id}`);
