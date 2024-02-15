import React, { useEffect, useState } from 'react';
import { GetQuiz } from '../services/QuizServices';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { SaveScore } from '../services/ScoreServices';


const QuizList = ({ user }) => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = user.id;

  useEffect(() => {
    if (selectedType) {
      const handleQuiz = async () => {
        try {
          setLoading(true);
          setError(null);

          const data = await GetQuiz(selectedType);

          if (data.results && Array.isArray(data.results)) {
            setQuizzes(data.results);
            // Initialize selectedAnswers and scores
            setSelectedAnswers(Array(data.results.length).fill(''));
            setScores(Array(data.results.length).fill(0));
          } else {
            console.error('Invalid quiz data format:', data);
          }
        } catch (error) {
          console.error('Error fetching quizzes:', error.message);
          setError('Failed to fetch quizzes. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      handleQuiz();
    }
  }, [selectedType]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAnswerChange = (index, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    // Calculate scores
    const newScores = quizzes.map((quiz, index) => {
      return selectedAnswers[index] === quiz.correct_answer ? 10 : 0;
    });
    setScores(newScores);
   await SaveScore(userId, newScores,selectedType);

    // Navigate to the results page
    navigate('/results', { state: { selectedAnswers, newScores } });
  };

  return (
    <div className="quiz-container">
      <h2>Choose Quiz Type:</h2>
      <select
        className="quiz-select"
        value={selectedType}
        onChange={handleTypeChange}
      >
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
      {loading && <p>Loading quizzes...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && quizzes.length === 0 && <p>No quizzes available.</p>}
      {!loading && quizzes.length > 0 && (
        <form className="quiz-form">
          {quizzes.map((quiz, index) => (
            <fieldset key={index}>
              <legend>
                <strong>Question:</strong> {quiz.question}
                <strong> Points: 10</strong>
              </legend>
              
              <strong>Choices:</strong>
              
              <ul>
                {quiz.incorrect_answers.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>
                    <input
                      type="radio"
                      id={`${index}_${choiceIndex}`}
                      name={`question_${index}`}
                      value={choice}
                      onChange={() => handleAnswerChange(index, choice)}
                      checked={selectedAnswers[index] === choice}
                    />
                    <label htmlFor={`${index}_${choiceIndex}`}>{choice}</label>
                  </li>
                ))}
                <li>
                  <input
                    type="radio"
                    id={`${index}_correct`}
                    name={`question_${index}`}
                    value={quiz.correct_answer}
                    onChange={() => handleAnswerChange(index, quiz.correct_answer)}
                    checked={selectedAnswers[index] === quiz.correct_answer}
                  />
                  <label htmlFor={`${index}_correct`}>{quiz.correct_answer}</label>
                </li>
              </ul>
            </fieldset>
          ))}
        </form>
      )}

<button
        onClick={handleSubmit}
        disabled={loading}
        className="submit-button"
      >
        {loading ? 'Submitting...' : 'Submit Answers'}
      </button>
    </div>
  );
};

export default QuizList;
