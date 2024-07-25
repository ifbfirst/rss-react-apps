import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchPersonQuery } from '../services/peopleApi';

export default function DetailsPage() {
  const { detailsId } = useParams<{ detailsId: string }>();
  const detailsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data, isFetching } = useFetchPersonQuery(detailsId || '');

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

  if (isFetching) {
    return <div className="preloader"></div>;
  }

  if (!data) {
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
}
