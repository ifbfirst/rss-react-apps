import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainContent from './MainContent';
import { PeopleResponse } from '@/interfaces/interfaces';
import { fetchPeople } from './api';

const PeoplePage = async () => {
  const initialData: PeopleResponse = await fetchPeople('', 1);

  return (
    <ErrorBoundary>
      <main className="main">
        <MainContent initialData={initialData} />
      </main>
    </ErrorBoundary>
  );
};

export default PeoplePage;
