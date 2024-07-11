import { SearchProps } from '../interfaces';

function Search(props: SearchProps) {
  return (
    <form className="search" onSubmit={props.onSearch}>
      <input
        type="search"
        className="search__input"
        onChange={props.onChange}
        value={props.searchText}
      />
      <button className="search__button" type="submit">
        search
      </button>
    </form>
  );
}

export default Search;
