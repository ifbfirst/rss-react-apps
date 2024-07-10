import { Component, ReactNode } from 'react';
import { SearchProps, SearchState } from '../interfaces';

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
