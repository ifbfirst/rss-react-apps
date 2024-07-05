import { Component, ReactNode } from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils';

interface SearchState {
  searchText: string | '';
}

class Search extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = { searchText: getItemFromLocalStorage('searchText') };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render(): ReactNode {
    return (
      <form className="search" onSubmit={this.handleClick}>
        <input
          type="search"
          className="search__input"
          onChange={this.handleChange}
          value={this.state.searchText}
        />
        <button className="search__button" type="submit">
          search
        </button>
      </form>
    );
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItemToLocalStorage('searchText', this.state.searchText.trim());
  };
}

export default Search;
