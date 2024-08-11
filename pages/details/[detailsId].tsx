import { useFetchPersonQuery } from '../../services/peopleApi';
import React from 'react';
interface PersonDetailsProps {
  personName: string;
  onClose: () => void;
}

const DetailsPage: React.FC<PersonDetailsProps> = ({ personName, onClose }) => {
  const { data, isFetching } = useFetchPersonQuery(personName);

  if (!data) {
    return;
  }
  if (isFetching) {
    return <div className="preloader" data-testid="loader"></div>;
  }

  return (
    <div className="person-detail-info">
      <span onClick={onClose} aria-label="Close details">
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      </span>
      <h2>{data.name}</h2>
      <h4>Details</h4>
      <ul>
        <li>Name: {data.name}</li>
        <li>Height: {data.height}</li>
        <li>Mass: {data.mass}</li>
        <li>Hair Color: {data.hair_color}</li>
        <li>Skin Color: {data.skin_color}</li>
        <li>Eye Color: {data.eye_color}</li>
        <li>Birth Year: {data.birth_year}</li>
        <li>Gender: {data.gender}</li>
      </ul>
    </div>
  );
};

export default DetailsPage;
