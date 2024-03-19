import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL || "http://webnotes.ct8.pl/api"
});

export default instance;