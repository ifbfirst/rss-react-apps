import { Link } from 'react-router-dom';
import { PeopleListProps, Person } from '../interfaces';
import { addPersonToList, removePersonFromList } from '../stores/peopleSlice';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/reducers';

function PeopleList(props: PeopleListProps) {
  const dispatch = useDispatch();
  const { personList } = useSelector((state: RootState) => state.people);

  // Проверяем, что personList определён и является массивом
  const isPersonInList = (name: string) =>
    Array.isArray(personList) &&
    personList.some((item: Person) => item.name === name);

  function checkboxHandler(e: ChangeEvent<HTMLInputElement>, person: Person) {
    e.stopPropagation();
    const checkbox = e.target as HTMLInputElement;
    checkbox?.checked
      ? dispatch(addPersonToList(person))
      : dispatch(removePersonFromList(person));
  }

  if (!props.people?.length) {
    return <div className="people-list">There is no result...</div>;
  }

  return (
    <div className="people-list">
      {props.people.map((person: Person) => (
        <Link
          to={`details/${person.name}`}
          key={person.name}
          className="person-card"
          data-testid="person-card"
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
            <div className="person__gender">
              gender: <span>{person.gender}</span>
            </div>
          </div>
          <label onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              className="checkbox__input"
              id={person.name}
              onChange={(e) => checkboxHandler(e, person)}
              checked={isPersonInList(person.name)} // Используем функцию, чтобы определить checked
            />
            Add to list
          </label>
        </Link>
      ))}
    </div>
  );
}

export default PeopleList;
