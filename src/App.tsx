import './App.css';
import PeopleList from './components/PeopleList';
import { getItemFromLocalStorage, setItemToLocalStorage } from './utils';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';
import { Person } from './interfaces';
import PreLoader from './components/PreLoader';
import { useEffect, useState } from 'react';
import Pagination from './components/Navigation';

const ROWS_PER_PAGE = 10;

function App() {
  const [displayText, setDisplayText] = useState(
    getItemFromLocalStorage('searchText') || ''
  );
  const [searchText, setSearchText] = useState(displayText);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [resultCount, setResultCount] = useState(0);
  const pageCount = Math.ceil(resultCount / ROWS_PER_PAGE);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayText(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItemToLocalStorage('searchText', displayText);
    setSearchText(displayText);
    setPage(1);
  }

  function raiseError() {
    setHasError(true);
    throw new Error('Искусственная ошибка от ErrorButton');
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const url = searchText
        ? `https://swapi.dev/api/people/?search=${encodeURIComponent(searchText)}`
        : `https://swapi.dev/api/people/?page=${page}`;
      try {
        const response = await fetch(url);
        const res = await response.json();
        const people: Person[] = res.results;
        setPeople(people);
        setResultCount(res.count);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, searchText]);

  function handleNextPageClick() {
    if (page < pageCount) {
      setPage(page + 1);
    }
  }

  function handlePrevPageClick() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  return (
    <div className="app">
      <header className="header">
        <h1>Star Wars People Finders</h1>
        <button className="error__button" onClick={raiseError}>
          error
        </button>
        <Search
          onChange={handleChange}
          onSearch={handleSearch}
          searchText={displayText}
        />
      </header>
      <main className="main">
        <ErrorBoundary hasError={hasError}>
          {isLoading ? <PreLoader /> : <PeopleList people={people} />}
          {pageCount !== 1 && pageCount !== 0 ? (
            <Pagination
              onNextPageClick={handleNextPageClick}
              onPrevPageClick={handlePrevPageClick}
              disable={{
                left: page === 1,
                right: page === pageCount,
              }}
              nav={{ current: page, total: pageCount }}
            />
          ) : (
            ''
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
