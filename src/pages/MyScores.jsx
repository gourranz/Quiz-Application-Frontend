import React, { useEffect, useState } from 'react';
import { getScoresByUserId, deleteScoreByUserId } from '../services/ScoreServices';
import '../App.css';

const MyScores = ({ user }) => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    if (user) {
      fetchScores();
    }
  }, [user]);

  const calculateTotalScore = (score) => {
    return score.scores.reduce((total, individualScore) => total + individualScore, 0);
  };

  const handleDeleteScore = async (scoreId) => {
    console.log('Deleting score with ID:', scoreId);
    try {
      await deleteScoreByUserId(user.id, scoreId);
      // Filter out the deleted score from the current state
      setScores((prevScores) => prevScores.filter((score) => score._id !== scoreId));
      console.log('Score deleted successfully');
    } catch (error) {
      console.error('Error deleting score:', error);
    }
  };
  
  

  const fetchScores = async () => {
    const response = await getScoresByUserId(user.id);
    console.log(response);
    setScores(response);
  };

  return (
    <div className="my-scores-container">
      <h2 className="my-scores-header">My Scores</h2>
      <ul className="my-scores-list">
        {scores &&
          scores.map((score, index) => (
            <li key={index} className="my-scores-item">
              <strong>Quiz Type:</strong> {score.quizType.join(', ')},
              <br />
              <strong>Total Score:</strong> {calculateTotalScore(score)},
              <br />
              <button onClick={() => handleDeleteScore(score._id)}>Delete Score</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyScores;
