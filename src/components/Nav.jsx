import { Link } from 'react-router-dom';
import '../App.css'

const Nav = ({ user, handleLogOut }) => {
  let userOptions;
  if (user) {
    userOptions = (
      <nav className="user-nav">
        <h3>Welcome {user.email}!</h3>
        <Link to="/quiz">Take a Quiz</Link>
        <Link to="/myscores">My Scores</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    );
  }

  const publicOptions = (
    <nav className="public-nav">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  );

  return (
    <header className="app-header">
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          <img
            className="logo"
            src="https://i.ibb.co/Z2pS7QX/vecteezy-quiz-sign-mark-free-png-27765346.png"
            alt="Quiz logo"
          />
        </div>
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  );
};

export default Nav;
