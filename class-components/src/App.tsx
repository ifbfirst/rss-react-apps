import './App.css';
import PeopleList from './components/PeopleList';
import { Component, ReactNode } from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from './utils';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';
import { Person } from './interfaces';
import PreLoader from './components/PreLoader';

interface State {
  searchText: string;
  hasError: boolean;
  people: Person[];
  isLoading: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchText: getItemFromLocalStorage('searchText') || '',
      hasError: false,
      people: [],
      isLoading: true,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItemToLocalStorage('searchText', this.state.searchText.trim());
    this.fetchData();
  };

  raiseError = () => {
    this.setState({ hasError: true });
    throw new Error('Искусственная ошибка от ErrorButton');
  };

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true });
    const url = this.state.searchText
      ? `https://swapi.dev/api/people/?search=${encodeURIComponent(this.state.searchText)}`
      : 'https://swapi.dev/api/people/';
    try {
      const response = await fetch(url);
      const res = await response.json();
      const people: Person[] = res.results;
      this.setState({ people, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  };

  render(): ReactNode {
    return (
      <div className="app">
        <header className="header">
          <h1>Star Wars People Finders</h1>
          <button className="error__button" onClick={this.raiseError}>
            error
          </button>
          <Search
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            searchText={this.state.searchText}
          />
        </header>
        <main className="main">
          <ErrorBoundary hasError={this.state.hasError}>
            {this.state.isLoading ? (
              <PreLoader />
            ) : (
              <PeopleList people={this.state.people} />
            )}
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

export default App;
