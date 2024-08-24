import { client } from "./apiConfigSanity";

export const getAllQuestions = async () => {
  const query = '*[_type == "questions"]';
  try {
    const response = await client.fetch(query);
    return response;
  } catch (error) {
    console.log("Error fetching questions: ", error);
    return { error: "Failed to fetch questions" };
  }
};