import { api } from "../../helpers/helpers";

// GET METHOD
export const getAllStudentInfoForTeacherByPage = (
    page = 0,
    size = 20,
    sort = "name",
    type = "page"
) =>
    api.get(
        `/studentInfo/getAllForTeacher?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

export const getAllStudentInfoForStudentByPage = (
    page = 0,
    size = 20,
    sort = "educationTerm",
    type = "page"
) =>
    api.get(
        `/studentInfo/getAllByStudent?page=${page}&size=${size}&sort=${sort}&type=${type}`
    );

export const getAllStudentInfo = () => api.get(`/studentInfo/getAll`);

// POST METHOD
export const createStudentInfo = (payload) =>
    api.post(`/studentInfo/save`, payload);

// PUT METHOD
export const updateStudentInfo = (id, payload) =>
    api.put(`/studentInfo/update/${id}`, payload);

// DELETE METHOD
export const deleteStudentInfo = (id) =>
    api.delete(`/studentInfo/delete/${id}`);
