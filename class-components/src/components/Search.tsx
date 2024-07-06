import { Component, ReactNode } from 'react';
import { setItemToLocalStorage } from '../utils';

interface SearchState {
  searchText: string | '';
}
interface SearchProps {
  searchText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}
class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render(): ReactNode {
    return (
      <form className="search" onSubmit={this.handleSearch}>
        <input
          type="search"
          className="search__input"
          onChange={this.handleChange}
          value={this.props.searchText}
        />
        <button className="search__button" type="submit">
          search
        </button>
      </form>
    );
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event);
  }

  handleSearch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setItemToLocalStorage('searchText', this.props.searchText.trim());
    this.props.onSearch();
  }
}

export default Search;
