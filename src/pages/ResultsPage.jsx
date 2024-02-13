// ResultsPage.jsx
import React, { useEffect } from 'react';

const ResultsPage = ({ location }) => {
  const selectedAnswers = location?.state?.selectedAnswers || [];

  useEffect(() => {
    console.log('Selected Answers:', selectedAnswers);
  }, [selectedAnswers]);

  return (
    <div>
      <h2>Results Page</h2>
      <ul>
        {selectedAnswers.map((answer, index) => (
          <li key={index}>{`Question ${index + 1}: ${answer}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
