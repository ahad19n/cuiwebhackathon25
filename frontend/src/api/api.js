import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: `${serverURL}/api`,
  withCredentials: true,
});

api.signUp = (payload) => {
  return api.post("/auth/register", payload);
};

api.SignIn = (payload) => {
  return api.post("/auth/login", payload);
};

export default api;
