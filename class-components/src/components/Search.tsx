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
    this.handleClick = this.handleClick.bind(this);
  }

  render(): ReactNode {
    return (
      <form className="search" onSubmit={this.handleClick}>
        <input
          type="search"
          className="search__input"
          onChange={this.handleChange}
          value={this.props.searchText}
        />
        <button className="search__button" type="submit">
          search
        </button>
        <button className="error__button" onClick={this.raiseError}>
          error
        </button>
      </form>
    );
  }

  raiseError = () => {
    throw new Error('Искусственная ошибка от ErrorButton');
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event);
  }

  handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItemToLocalStorage('searchText', this.props.searchText.trim());
    this.props.onSearch();
  }
}

export default Search;
