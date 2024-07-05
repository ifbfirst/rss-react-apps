import './App.css';
import PeopleList from './components/PeopleList';
import { Component, ReactNode } from 'react';
import { getItemFromLocalStorage } from './utils';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';

interface State {
  searchText: string;
  shouldFetch: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchText: getItemFromLocalStorage('searchText') || '',
      shouldFetch: false,
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

  render(): ReactNode {
    return (
      <div className="app">
        <header className="header">
          <h1>PeopleSearch</h1>

          <Search
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            searchText={this.state.searchText}
          />
        </header>
        <ErrorBoundary>
          <main className="main">
            <PeopleList
              shouldFetch={this.state.shouldFetch}
              searchText={this.state.searchText}
              onSearchComplete={this.handleSearchComplete}
            />
          </main>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
