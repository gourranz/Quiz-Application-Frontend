import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css'; 

const ResultsPage = () => {
  const location = useLocation();
  const selectedAnswers = location.state?.selectedAnswers || [];
  const scores = location.state?.newScores || [];

  // Calculate total score
  const totalScore = scores.reduce((accumulator, currentScore) => accumulator + currentScore, 0);

  return (
    <div className="results-container">
      <h2 className="results-heading">Results</h2>
      {selectedAnswers.length > 0 ? (
        <div>
          <p className="total-score">Total Score: {totalScore}</p>
          <ul className="results-list">
            {selectedAnswers.map((answer, index) => (
              <li key={index} className="result-item">
                <strong>Question {index + 1}:</strong>
                <br />
                <span className="selected-answer">Selected Answer: {answer}</span>
                <br />
                <span className="points">Points: {scores[index]}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-results">No results available.</p>
      )}
    </div>
  );
};

export default ResultsPage;
