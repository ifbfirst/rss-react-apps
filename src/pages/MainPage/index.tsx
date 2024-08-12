import { Link } from 'react-router-dom';
import './index.css';

const MainPage = () => {
  return (
    <div className="main__content">
      <h1>MainPage</h1>
      <div className="main__links">
        <Link to="/first" className="btn-first">
          Go to first form
        </Link>
        <Link to="/second" className="btn-second">
          Go to second form
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
