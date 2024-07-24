import { Link } from 'react-router-dom';
import { PeopleListProps, Person } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addPersonToList, removePersonFromList } from '../stores/peopleSlice';
import { RootState } from '../stores/reducers';

function PeopleList(props: PeopleListProps) {
  const dispatch = useDispatch();
  const { personList } = useSelector((state: RootState) => state.people);

  function checkboxHandler(e: Event, person: Person) {
    e.stopPropagation();
    const checkbox = e.target as HTMLInputElement;
    if (checkbox?.checked) {
      dispatch(addPersonToList(person));
    }
    if (!checkbox?.checked) {
      dispatch(removePersonFromList(person));
    }
  }
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
            <label onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                className="checkbox__input"
                id={person.name}
                onChange={(e) => {
                  checkboxHandler(e, person);
                }}
                {...(personList.some(
                  (item: Person) => item.name === person.name
                )
                  ? { checked: 'true' }
                  : {})}
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
