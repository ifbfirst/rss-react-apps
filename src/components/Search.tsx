import { useState } from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils';
import { setSearchText } from '../stores/peopleSlice';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState<string>(
    getItemFromLocalStorage('searchText' || '')
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayText(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSearchText(displayText));
    updateURLParams({ searchText: displayText });
    setItemToLocalStorage('searchText', displayText);
  }

  function updateURLParams(params: { searchText?: string; page?: number }) {
    navigate('/');
    const newParams = { ...queryString.parse(location.search), ...params };
    navigate({ search: queryString.stringify(newParams) });
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
