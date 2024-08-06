import { useEffect, useState } from 'react';
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  updateURLParams,
} from '../utils';
import { initializeSearchText, setSearchText } from '../stores/peopleSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();

  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    const savedSearchText = localStorage.getItem('searchText');
    if (savedSearchText) {
      dispatch(initializeSearchText(JSON.parse(savedSearchText).value));
    }
  }, [dispatch]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayText(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSearchText(displayText));
    updateURLParams({ searchText: displayText });
    setItemToLocalStorage('searchText', displayText);
  }

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder=""
        className="search__input"
        onChange={handleChange}
        value={displayText}
      />
      <button className="search__button" type="submit">
        search
      </button>
    </form>
  );
};

export default Search;
