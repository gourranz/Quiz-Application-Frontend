import Client from './api';

export const GetQuiz = async (quizType) => {
  try {
    const res = await Client.get(`/quiz/${quizType}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
