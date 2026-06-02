
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    console.log(`Calling: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

export default api;


