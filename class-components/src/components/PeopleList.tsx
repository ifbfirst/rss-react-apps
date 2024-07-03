import { Component } from 'react';
import { Person } from '../interfaces';

interface MyState {
  people: Person[];
  loading: boolean;
}
interface MyProps {}

class PeopleList extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      people: [],
      loading: true,
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
      this.setState({ people, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { people, loading } = this.state;
    if (loading) {
      return <div className="preloader"></div>;
    }
    return (
      <div className="person-list">
        {people.map((person: Person, index: number) => (
          <div key={index} className="person">
            <i className="fa-solid fa-user"></i>
            <div className="person__name">Name: {person.name}</div>
            <div className="person__height">Height: {person.height}</div>
            <div className="person__mass">Mass: {person.mass}</div>
            <div className="person__height">Eye color: {person.eye_color}</div>
            <div className="person__mass">Mass: {person.gender}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PeopleList;
