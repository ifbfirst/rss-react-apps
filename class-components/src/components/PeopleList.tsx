import { Component } from 'react';
import { Person } from '../interfaces';

interface PeopleListState {
  people: Person[];
  isLoading: boolean;
}

interface PeopleProps {
  searchText: string;
  shouldFetch: boolean;
  onSearchComplete: () => void;
}

class PeopleList extends Component<PeopleProps, PeopleListState> {
  constructor(props: PeopleProps) {
    super(props);
    this.state = {
      people: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.dataHandler();
  }

  componentDidUpdate(prevProps: PeopleProps) {
    if (
      prevProps.shouldFetch !== this.props.shouldFetch &&
      this.props.shouldFetch
    ) {
      this.dataHandler();
    }
  }

  dataHandler = async () => {
    const { searchText, onSearchComplete } = this.props;

    const url = searchText
      ? `https://swapi.dev/api/people/?search=${encodeURIComponent(searchText)}`
      : 'https://swapi.dev/api/people/';
    try {
      const response = await fetch(url);
      const res = await response.json();
      const people: Person[] = res.results;
      this.setState({ people, isLoading: false }, onSearchComplete);
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false }, onSearchComplete);
    }
  };

  render() {
    const { people, isLoading } = this.state;
    if (isLoading) {
      return <div className="preloader"></div>;
    }
    if (!people?.length) {
      return (
        <div className="people-list">
          Результат поиска отсутсвует. Попробуйте еще...
        </div>
      );
    }
    return (
      <div className="people-list">
        {people?.map((person: Person, index: number) => (
          <div key={index} className="person">
            <i className="fa-solid fa-user"></i>
            <div className="person__name">Name: {person.name}</div>
            <div className="person__height">Height: {person.height}</div>
            <div className="person__mass">Mass: {person.mass}</div>
            <div className="person__height">Eye color: {person.eye_color}</div>
            <div className="person__mass">Gender: {person.gender}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PeopleList;
