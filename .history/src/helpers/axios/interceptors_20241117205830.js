import axios from "axios";
import { encryptedLocalStorage } from "../helpers";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = encryptedLocalStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => {
        return error;
    }
);

export default api;


