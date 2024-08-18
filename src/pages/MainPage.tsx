import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/reducers';
import { DataItem } from '../interfaces';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const { arrayData } = useSelector((state: RootState) => state.data);
  const [showColorClass, setShowColorClass] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowColorClass(false);
    }, 5000);
  });

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
      {arrayData.length ? (
        <div className="main__items">
          {arrayData.map((item: DataItem, index) => (
            <div
              className={
                index === arrayData.length - 1 && showColorClass
                  ? 'main__item main__item_color'
                  : 'main__item'
              }
              key={item.email}
            >
              <div>
                <img src={item.image} alt="image_profile" />
              </div>
              <div>
                <span>name:</span> {item.name}
              </div>
              <div>
                <span>age:</span> {item.age}
              </div>
              <div>
                <span>email:</span> {item.email}
              </div>
              <div>
                <span>password:</span>
                {item.password}
              </div>
              <div>
                <span>gender:</span>
                {item.gender}
              </div>
              <div>
                <span>country:</span>
                {item.country}
              </div>
            </div>
          ))}
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
