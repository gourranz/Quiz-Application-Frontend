
import Client from './api';

export const SaveScore = async (id, scores,quizType,totalScore) => {
  try {
    await Client.post(`/quiz/save/${id}`, {id, scores,quizType,totalScore});
    console.log('Score saved successfully');
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};
export const getScoresByUserId = async (id ,scores,quizType,totalScore) => {
  try {
      const response = await Client.get(`/quiz/save/${id}`,{id, scores,quizType,totalScore} );
      return response.data;
  } catch (error) {
      console.error('Error getting scores:', error);
      throw error;
  }
};
export const deleteScoreByUserId = async (userId, scoreId) => {
  try {
    await Client.delete(`/quiz/delete/${scoreId}`);
    console.log('Score deleted successfully');
  } catch (error) {
    console.error('Error deleting score:', error);
    throw error;
  }
};
