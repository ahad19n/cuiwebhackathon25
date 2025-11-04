import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: `${serverURL}/api`,
  withCredentials: true,
});

// Request interceptor to attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.signUp = (payload) => {
  return api.post("/auth/register", payload);
};

api.signIn = (payload) => {
  return api.post("/auth/login", payload);
};

api.signOut = () => {
  return api.post("/auth/logout");
};

api.getRates = () => {
  return api.get("/rates");
};

api.addRate = (payload) => {
  return api.post("/rates", payload);
};

api.updateRate = (id, rateId, payload) => {
  return api.patch(`/rates/${id}/${rateId}`, payload);
};

api.deleteRate = (id, rateId) => {
  return api.delete(`/rates/${id}/${rateId}`);
};

// Forum endpoints
api.getPosts = () => {
  return api.get("/forum");
};

api.createPost = (payload) => {
  return api.post("/forum", payload);
};

api.updatePost = (id, payload) => {
  return api.patch(`/forum/${id}`, payload);
};

api.deletePost = (id) => {
  return api.delete(`/forum/${id}`);
};

api.addComment = (id, payload) => {
  return api.post(`/forum/${id}`, payload);
};

// Advice endpoint
api.getAdvice = (payload) => {
  return api.post("/advise", payload);
};

export default api;
