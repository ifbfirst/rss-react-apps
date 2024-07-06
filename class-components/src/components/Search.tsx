import { Component, ReactNode } from 'react';

interface SearchState {
  searchText: string | '';
}
interface SearchProps {
  searchText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}
class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <form className="search" onSubmit={this.props.onSearch}>
        <input
          type="search"
          className="search__input"
          onChange={this.props.onChange}
          value={this.props.searchText}
        />
        <button className="search__button" type="submit">
          search
        </button>
      </form>
    );
  }
}

export default Search;
