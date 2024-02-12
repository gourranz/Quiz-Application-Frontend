import { useEffect, useState } from 'react';
import { GetQuiz } from '../services/QuizServices';
import { useNavigate } from 'react-router-dom';

const QuizList = ({ user }) => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedType, setSelectedType] = useState(''); 
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (selectedType) {
      const handleQuiz = async () => {
        try {
          const data = await GetQuiz(selectedType);
          if (data.results && Array.isArray(data.results)) {
            setQuizzes(data.results);
            // Reset selected answers when fetching new quizzes
            setSelectedAnswers({});
          } else {
            console.error('Invalid quiz data format:', data);
          }
        } catch (error) {
          console.error('Error fetching quizzes:', error.message);
        }
      };
      handleQuiz();
    }
  }, [selectedType]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <div>
      <h2>Choose Quiz Type:</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select a type</option>
        <option value="geography">Geography</option>
        <option value="history">History</option>
        <option value="sports">Sports</option>
        <option value="art">Art</option>
        <option value="politics">Politics</option>
        <option value="animals">Animals</option>
        <option value="computerscience">Computer-Science</option>
        <option value="scienceNature">Science-Nature</option>
        
      </select>
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
                  <li > {quiz.correct_answer} </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
