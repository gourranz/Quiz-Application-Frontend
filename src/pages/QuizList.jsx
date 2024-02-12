import { useEffect, useState } from 'react';
import { GetQuiz } from '../services/QuizServices';
import { useNavigate } from 'react-router-dom';

const QuizList = ({ user }) => {
  let navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const handleQuiz = async () => {
      try {
        const data = await GetQuiz();
        if (data.results && Array.isArray(data.results)) {
          setQuizzes(data.results);
        } else {
          console.error('Invalid quiz data format:', data);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error.message);
      }
    };
    handleQuiz();
  }, []);

  return (
    <div>
      <h2>Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <strong>Question:</strong> {quiz.question}
              <br />
              <strong>Category:</strong> {quiz.category}
              <br />
              <strong>Difficulty:</strong> {quiz.difficulty}
              <br />
              <strong>Choices:</strong>
              <ul>
                {quiz.incorrect_answers.map((choice, index) => (
                  <li key={index}>{choice}</li>
                  ))}
                  <li > {quiz.correct_answer}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
