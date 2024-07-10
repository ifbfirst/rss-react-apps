import { ReactNode } from 'react';

export interface Person {
  name: string;
  mass: string;
  height: string;
  eye_color: string;
  gender: string;
}

export interface State {
  searchText: string;
  hasError: boolean;
  people: Person[];
  isLoading: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  hasError: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
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
