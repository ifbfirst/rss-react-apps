import { ReactNode } from 'react';

export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

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

export interface PeopleListProps {
  people: Person[] | undefined;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
