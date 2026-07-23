import axios from "axios";

const getCurrentUser = () => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`, {
    withCredentials: true,
  });
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
      userData,
      {
        withCredentials: true,
      },
    );

    if (!response.data) {
      console.log("Error while fetching response.");
    }
    return response.data;
  } catch (error) {
    console.log("Error while registering user");
    throw error;
  }
};
const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
      userData,
      { withCredentials: true },
    );

    if (!response.data) {
      console.log("Error while fetching response");
    }
    return response.data;
  } catch (error) {
    console.log("Error while logging in user");
    throw error;
  }
};

const logOutUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log("Error while logging out user");
    throw error;
  }
};

const requestMagicLink = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/magic-link`,
      userData,
      { withCredentials: true },
    );
    if (!response.data) {
      console.log("Error while fetching response");
    }
    return response.data;
  } catch (error) {
    console.log("Error while sending magic link");
    throw error;
  }
};

const loginThroughMagicLink = async (token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/magic-login`,
      { token },
      {
        withCredentials: true,
      },
    );

    if (!response.data) {
      console.log("Error while fetching data.");
    }
    return response.data;
  } catch {
    console.log("Error while logging in.", error);
    throw error;
  }
};

export {
  getCurrentUser,
  registerUser,
  loginUser,
  logOutUser,
  loginThroughMagicLink,
  requestMagicLink,
};
