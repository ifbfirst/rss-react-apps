import { Component, ReactNode } from 'react';
import PeopleList from './PeopleList';

interface MainState {
  urlListPeople: string;
}

class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
  }

  render(): ReactNode {
    return (
      <main className="main">
        <PeopleList />
      </main>
    );
  }
}

export default Main;
