import './App.css';
import PeopleList from './components/PeopleList';
import { Component, ReactNode } from 'react';
import { getItemFromLocalStorage } from './utils';
import Search from './components/Search';

class App extends Component {
  constructor(props: object) {
    super(props);
    this.state = {
      searchText: getItemFromLocalStorage('searchText'),
    };
  }

  render(): ReactNode {
    return (
      <div className="app">
        <header className="header">
          <h1>PeopleSearch</h1>
          <Search />
        </header>
        <main className="main">
          <PeopleList />
        </main>
      </div>
    );
  }
}

export default App;
