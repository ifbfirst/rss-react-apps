import './App.css';
import PeopleList from './components/PeopleList';
import { Component, ReactNode } from 'react';
import { getItemFromLocalStorage } from './utils';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';

interface State {
  searchText: string;
  shouldFetch: boolean;
  hasError: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchText: getItemFromLocalStorage('searchText') || '',
      shouldFetch: false,
      hasError: false,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  handleSearch = () => {
    this.setState({ shouldFetch: true });
  };

  handleSearchComplete = () => {
    this.setState({ shouldFetch: false });
  };
  raiseError = () => {
    this.setState({ hasError: true });
    throw new Error('Искусственная ошибка от ErrorButton');
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
            <PeopleList
              shouldFetch={this.state.shouldFetch}
              searchText={this.state.searchText}
              onSearchComplete={this.handleSearchComplete}
            />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

export default App;
