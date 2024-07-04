import { Component } from 'react';
import { Person } from '../interfaces';
import { appStore } from '../AppStore';

interface PeopleListState {
  people: Person[];
  isLoading: boolean;
  searchText: string | '';
}

class PeopleList extends Component<object, PeopleListState> {
  constructor(props: object) {
    super(props);
    this.state = {
      people: appStore.state.people || [],
      isLoading: true,
      searchText: appStore.state.searchText || '',
    };
    this.renderPeople = this.renderPeople.bind(this);
  }
  componentDidMount() {
    this.renderPeople();
  }

  componentDidUpdate(prevState: PeopleListState) {
    // alert(appStore.state.searchText);
    // alert(prevState.searchText);
    if (
      this.state.searchText !== prevState.searchText &&
      appStore.state.searchText !== prevState.searchText
    ) {
      this.renderPeople();
    }
  }
  renderPeople = async () => {
    const searchText = appStore.state.searchText || '';
    const url = searchText
      ? `https://swapi.dev/api/people/?search=${encodeURIComponent(searchText)}`
      : 'https://swapi.dev/api/people/';
    try {
      const response = await fetch(url);
      const res = await response.json();
      const people: Person[] = res.results;
      this.setState({ people, isLoading: false });
      appStore.setState({ people });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { people, isLoading } = this.state;
    if (isLoading) {
      return <div className="preloader"></div>;
    }
    if (!people?.length) {
      return (
        <div className="person-list">
          Результат поиска отсутсвует. Попробуйте еще...
        </div>
      );
    }
    return (
      <div className="person-list">
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
