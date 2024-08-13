import { Link } from 'react-router-dom';
import { RootState } from '../store/reducers';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { name, age, email, password, gender } = useSelector(
    (state: RootState) => state.data
  );
  return (
    <div className="main__content">
      <h2>MainPage</h2>
      <div className="main__links">
        <Link to="/first" className="btn-first">
          Go to first form
        </Link>
        <Link to="/second" className="btn-second">
          Go to second form
        </Link>{' '}
      </div>

      <div className="form__info">
        <div>
          <span>name:</span> {name}
        </div>
        <div>
          <span>age:</span> {age}
        </div>
        <div>
          <span>email:</span> {email}
        </div>
        <div>
          <span>password:</span>
          {password}
        </div>
        <div>
          <span>gender:</span>
          {gender}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
