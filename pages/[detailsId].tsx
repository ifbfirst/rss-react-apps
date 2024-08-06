import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFetchPersonQuery } from '@/services/peopleApi';
import { Person } from '@/interfaces';

interface PersonDetailsProps {
  person: Person;
  onClose: () => void;
}

const DetailsPage: React.FC<PersonDetailsProps> = ({ person, onClose }) => {
  return (
    <div className="person-detail-info">
      <span onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </span>
      <h2>{person.name}</h2>
      <h4>Details</h4>
      <ul>
        <li>Name: {person.name}</li>
        <li>Height: {person.height}</li>
        <li>Mass: {person.mass}</li>
        <li>Hair Color: {person.hair_color}</li>
        <li>Skin Color: {person.skin_color}</li>
        <li>Eye Color: {person.eye_color}</li>
        <li>Birth Year: {person.birth_year}</li>
        <li>Gender: {person.gender}</li>
      </ul>
    </div>
  );
};

export default DetailsPage;
