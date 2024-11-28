import instance from "../api/axiosConfig";

// Loggin in and TODO: sets refreshToken to the localStorage
const login = async (credentials: {
  login: string;
  password: string;
}): Promise<string> => {
  try {
    await instance.post("/login", credentials);

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
