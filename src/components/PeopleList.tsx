import { Link } from 'react-router-dom';
import { PeopleListProps, Person } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addPersonToList, removePersonFromList } from '../stores/peopleSlice';
import { RootState } from '../stores/reducers';
import { ChangeEvent } from 'react';

function PeopleList(props: PeopleListProps) {
  const dispatch = useDispatch();
  const { personList } = useSelector((state: RootState) => state.people);

  function checkboxHandler(e: ChangeEvent<HTMLInputElement>, person: Person) {
    e.stopPropagation();
    const checkbox = e.target as HTMLInputElement;
    checkbox?.checked
      ? dispatch(addPersonToList(person))
      : dispatch(removePersonFromList(person));
  }
  if (!props.people?.length) {
    return <div className="people-list">There is no result... Try again.</div>;
  }
  return (
    <div className="people-list">
      {props.people?.map((person: Person) => (
        <Link
          to={`details/${person.name}`}
          key={person.name}
          className="person-card"
          data-testid="person-card "
        >
          <i className="fa-solid fa-user"></i>
          <div>
            <div className="person__name">
              name: <span>{person.name}</span>
            </div>
            <div className="person__height">
              height: <span>{person.height}</span>
            </div>
            <div className="person__mass">
              mass: <span>{person.mass}</span>
            </div>
            <div className="person__mass">
              gender: <span>{person.gender}</span>
            </div>
          </div>
          <label onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              className="checkbox__input"
              id={person.name}
              onChange={(e) => {
                checkboxHandler(e, person);
              }}
              {...(personList.some((item: Person) => item.name === person.name)
                ? { checked: true }
                : {})}
            />
            Add to list
          </label>
        </Link>
      ))}
    </div>
  );
}

export default PeopleList;
