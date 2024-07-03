import { Component } from 'react';
import Person from './Person';

interface MyState {
  people: Person[];
}
interface MyProps {}

class PeopleList extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      people: [],
    };
  }
  componentDidMount() {
    this.renderPeople();
  }

  renderPeople = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const res = await response.json();
      const people: Person[] = res.results;
      this.setState({ people });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { people } = this.state;
    return (
      <div className="person-list">
        {people.map((person: Person, index: number) => (
          <div key={index} className="person">
            <div className="person__name">Name: {person.name}</div>
            <div className="person__height">Height: {person.height}</div>
            <div className="person__mass">Mass: {person.mass}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PeopleList;
