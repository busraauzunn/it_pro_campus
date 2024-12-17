import { api } from "../../helpers/helpers";

export const getAllAdvisorTeachers = async () =>
    api.get("/advisorTeacher/getAll");
