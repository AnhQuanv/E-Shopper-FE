import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const IMAGE_BASE_URL = "http://127.0.0.1:8000/upload/Blog/image/";
export const IMAGE_AVATAR_COMMENT =
  "http://127.0.0.1:8000/laravel/public/upload/user/avatar/";
export default axiosClient;
