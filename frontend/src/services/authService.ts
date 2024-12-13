import { instance } from "../api/axiosConfig";

interface ITokens {
  refreshToken: string;
  accessToken: string;
}

const login = async (credentials: {
  login: string;
  password: string;
}): Promise<string> => {
  try {
    const response = await instance.post("/login", credentials);
    const { refreshToken, accessToken } = response.data;

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

// Retrieve new jwt tokens from server if possible
const updateToken = async (refreshToken: string): Promise<ITokens | null> => {
  try {
    const response = await instance.post("/refresh", { refreshToken });
    const data: ITokens = response.data;

    return data;
  } catch (error) {
    console.error("Token updating error", error);
    return null;
  }
};
export { login, logout, updateToken };
