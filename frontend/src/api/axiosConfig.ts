import axios from "axios";
import api from "../constants/api";
import { updateToken } from "../services/authService";

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const adminInstance = axios.create({
  baseURL: api.adminURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Bearer token to headers before request to server
adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Token is missed in a local storage");
    }
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Check for new jwt tokens if access token expired
adminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const oldRefreshToken = localStorage.getItem("refresh_token");

        if (typeof oldRefreshToken !== "string") {
          return;
        }

        const data = await updateToken(oldRefreshToken);

        if (!data) {
          return;
        }
        const { refreshToken, accessToken } = data;

        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("access_token", accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return adminInstance(originalRequest);
      } catch (error) {
        console.error("Interceptor token updating error", error);
      }
    }

    return Promise.reject(error);
  }
);

export { instance, adminInstance };
