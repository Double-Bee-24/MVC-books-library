import { instance } from "../api/axiosConfig";

const login = async (credentials: {
  login: string;
  password: string;
}): Promise<string> => {
  try {
    const result = await instance.post("/login", credentials);
    const { refreshToken, accessToken } = result.data;

    // Store tokens and status in browser memory
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("auth_status", "authorized");

    return "success";
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return "unseccess";
  }
};

const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth_status");
  } catch (error) {
    console.error("Error while fetching books: ", error);
  }
};

export { login, logout };
