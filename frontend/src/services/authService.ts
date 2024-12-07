import { instance } from "../api/axiosConfig";

const login = async (credentials: {
  login: string;
  password: string;
}): Promise<string> => {
  try {
    const result = await instance.post("/login", credentials);
    const { refreshToken, accessToken } = result.data;

    // Store tokens in browser memory
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    return "success";
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return "unseccess";
  }
};

const logout = async (): Promise<string> => {
  try {
    const response = await instance.post("/logout");
    const data: string = response.data;

    return data;
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return "";
  }
};

export { login, logout };
