import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginUser = (loginData) => API.post("/auth/login", loginData);
export const signupUser = (userData) => API.post("/auth/signup", userData);
export const getPortfolio = (token) => API.get("/portfolio", {
  headers: { Authorization: `Bearer ${token}` },
});
export const updatePortfolio = (token, portfolioData) => API.put("/portfolio", portfolioData, {
  headers: { Authorization: `Bearer ${token}` },
});

export default API;