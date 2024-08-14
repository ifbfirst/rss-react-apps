import { Link } from 'react-router-dom';
import { RootState } from '../store/reducers';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { name, age, email, password, gender, image } = useSelector(
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
        </Link>
      </div>
      {name ? (
        <div className="form__info">
          <div>
            <img src={image} alt="image_profile" />
          </div>
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
      ) : (
        <img
          src="./profile_icon.png"
          alt="profile_icon"
          className="image-profile"
        />
      )}
    </div>
  );
};

export default MainPage;
