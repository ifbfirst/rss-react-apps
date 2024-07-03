class DataHandler {
  people: [];
  constructor() {
    this.people = [];
  }

  async fetchData() {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      this.people = data.results;
    } catch (err) {
      console.log('Error:', err);
    }
  }
}

export const dataHandler = new DataHandler();
