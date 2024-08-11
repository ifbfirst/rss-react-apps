import React from 'react';
import { fetchPeople } from '../api';
import { PeopleResponse } from '@/interfaces/interfaces';

interface PersonDetailsProps {
  personName: string;
  onClose: () => void;
}

const DetailsPage: React.FC<PersonDetailsProps> = async ({
  personName,
  onClose,
}) => {
  const data: PeopleResponse = await fetchPeople(personName, 1);

  return (
    <div className="person-detail-info">
      <span onClick={onClose} aria-label="Close details">
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      </span>
      <h2>{data.results[0].name}</h2>
      <h4>Details</h4>
      <ul>
        <li>Name: {data.results[0].name}</li>
        <li>Height: {data.results[0].height}</li>
        <li>Mass: {data.results[0].mass}</li>
        <li>Hair Color: {data.results[0].hair_color}</li>
        <li>Skin Color: {data.results[0].skin_color}</li>
        <li>Eye Color: {data.results[0].eye_color}</li>
        <li>Birth Year: {data.results[0].birth_year}</li>
        <li>Gender: {data.results[0].gender}</li>
      </ul>
    </div>
  );
};

export default DetailsPage;
