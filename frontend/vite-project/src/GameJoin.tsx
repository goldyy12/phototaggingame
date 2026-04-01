import api from "./Api";

export const joinGame = async (username: string) => {
  try {
    const response = await api.post("/join", { username });
    return response.data;
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
};
