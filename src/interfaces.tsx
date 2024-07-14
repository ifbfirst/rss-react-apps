import { ReactNode } from 'react';

export interface Person {
  name: string;
  mass: string;
  height: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  gender: string;
  birth_year: string;
}

export interface State {
  searchText: string;
  hasError: boolean;
  people: Person[];
  isLoading: boolean;
}

export interface PeopleListProps {
  people: Person[];
}

export interface SearchState {
  searchText: string | '';
}
export interface SearchProps {
  searchText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
