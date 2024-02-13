import React, { useEffect, useState } from 'react';
import { GetQuiz } from '../services/QuizServices';
import { useNavigate } from 'react-router-dom';

const QuizList = ({ user }) => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    if (selectedType) {
      const handleQuiz = async () => {
        try {
          const data = await GetQuiz(selectedType);
          if (data.results && Array.isArray(data.results)) {
            setQuizzes(data.results);
            // Initialize selectedAnswers with empty strings for each question
            setSelectedAnswers(Array(data.results.length).fill(''));
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

  const handleAnswerChange = (index, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    // Ensure selectedAnswers is correct here
    console.log('Submitting Answers:', selectedAnswers);
    navigate('/results', { state: { selectedAnswers } });
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
        <form>
          {quizzes.map((quiz, index) => (
            <fieldset key={index}>
              <legend>
                <strong>Question:</strong> {quiz.question}
              </legend>
              <strong>Category:</strong> {quiz.category}
              <br />
              <strong>Difficulty:</strong> {quiz.difficulty}
              <br />
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

      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
};

export default QuizList;
