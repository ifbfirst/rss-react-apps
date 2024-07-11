import { PeopleListProps, Person } from '../interfaces';

function PeopleList(props: PeopleListProps) {
  if (!props.people?.length) {
    return <div className="people-list">There is no result... Try again.</div>;
  }
  return (
    <div className="people-list">
      {props.people?.map((person: Person, index: number) => (
        <div key={index} className="person">
          <i className="fa-solid fa-user"></i>
          <div className="person__name">Name: {person.name}</div>
          <div className="person__height">Height: {person.height}</div>
          <div className="person__mass">Mass: {person.mass}</div>
          <div className="person__height">Eye color: {person.eye_color}</div>
          <div className="person__mass">Gender: {person.gender}</div>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;
