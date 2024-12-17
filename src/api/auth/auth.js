import { api } from "../../helpers/helpers";

// POST METHOD
export const login = async (payload) => await api.post("/auth/login", payload);

// GET METHOD
export const getUser = async () => await api.get("/user/me");
