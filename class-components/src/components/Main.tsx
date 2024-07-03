import { Component, ReactNode } from 'react';
import PeopleList from './PeopleList';

class Main extends Component {
  render(): ReactNode {
    return (
      <main className="main">
        <PeopleList />
      </main>
    );
  }
}

export default Main;
