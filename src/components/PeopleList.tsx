import { Link } from 'react-router-dom';
import { PeopleListProps, Person } from '../interfaces';

function PeopleList(props: PeopleListProps) {
  if (!props.people?.length) {
    return <div className="people-list">There is no result... Try again.</div>;
  }

  return (
    <div className="people-list">
      {props.people?.map((person: Person) => (
        <Link to={`details/${person.name}`}>
          <div key={person.name} className="person" data-testid="person-card ">
            <i className="fa-solid fa-user"></i>
            <div className="person__name">Name: {person.name}</div>
            <div className="person__height">Height: {person.height}</div>
            <div className="person__mass">Mass: {person.mass}</div>
            <div className="person__mass">Gender: {person.gender}</div>
            <label>
              <input
                type="checkbox"
                className="checkbox__input"
                id={person.name}
              />
              Add to list
            </label>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PeopleList;
