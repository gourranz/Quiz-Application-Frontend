import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Nav from './components/Nav';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import './App.css';
import { CheckSession } from './services/Auth.js';
import Quiz from './pages/QuizList.jsx'
import ResultsPage from './pages/ResultsPage.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    try {
      const user = await CheckSession();
      setUser(user);
    } catch (error) {
      // Handle any errors from CheckSession
      console.error('Error checking session:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken();
    }
  }, []);

  const handleLogOut = () => {
    // Reset all auth-related state and clear localStorage
    setUser(null);
    localStorage.clear();
  };

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
