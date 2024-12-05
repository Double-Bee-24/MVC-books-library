import axios from "axios";
import api from "../constants/api";

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

export { instance, adminInstance };
