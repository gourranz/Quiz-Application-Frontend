import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container col">
      
      <section className="welcome-signin">
        
        <button onClick={() => navigate('/signin')}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
