import { Component, ReactNode } from 'react';
import { appStore } from '../AppStore';

interface SearchState {
  searchText: string | '';
}
class Search extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = { searchText: appStore.state.searchText || '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render(): ReactNode {
    return (
      <form className="search" onSubmit={this.handleClick}>
        <input
          type="search"
          className="search__input"
          onChange={this.handleChange}
          value={`${this.state.searchText}`}
        />
        <button className="search__button" type="submit">
          search
        </button>
      </form>
    );
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchText: event.target.value.trim() });
  }

  handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    appStore.setState({ searchText: this.state.searchText });
  }
}

export default Search;
