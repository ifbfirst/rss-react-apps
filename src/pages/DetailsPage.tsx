import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Person } from '../interfaces';
import { BASE_URL } from '../constants';

export default function DetailsPage() {
  const { detailsId } = useParams<{ detailsId: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const detailsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?search=${detailsId}`);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node) &&
        !target.closest('a') &&
        target.closest('main')
      ) {
        navigate('/');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [navigate]);

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
    <div className="person-detail-info" ref={detailsRef}>
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
