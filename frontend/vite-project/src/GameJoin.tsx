import api from "./Api.js";
import { AxiosError } from "axios";

// Define an interface for what your backend returns on error
interface BackendError {
  error: string;
}

export const joinGame = async (username: string) => {
  try {
    const response = await api.post("/join", { username });
    return response.data;
  } catch (err) {
    // Cast the error to AxiosError with our custom interface
    const axiosError = err as AxiosError<BackendError>;

    const errorMessage =
      axiosError.response?.data?.error || "An unexpected error occurred";

    throw new Error(errorMessage);
  }
};
