export interface Person {
  name: string;
  mass: string;
  height: string;
  eye_color: string;
  gender: string;
}

export interface State {
  people: Person[];
  searchText: string | '';
}
