import axios from "axios";
import api from "../constants/api";

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
