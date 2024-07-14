import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Person } from '../interfaces';
import { apiRoot } from '../Constants';

export default function DetailsPage() {
  const { detailsId } = useParams<{ detailsId: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiRoot}?search=${detailsId}`);
        const person = await response.json();
        setPerson(person.results[0]);
      } catch (error) {
        console.error('Error fetching person details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (detailsId) {
      fetchPersonDetails();
    }
  }, [detailsId]);

  if (isLoading) {
    return <div className="preloader"></div>;
  }

  if (!person) {
    return <div>No details available for this person.</div>;
  }

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="person-detail-info">
      <span onClick={handleClose}>
        <i className="fa-solid fa-xmark"></i>
      </span>
      <h2>{person.name}</h2>
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
}
