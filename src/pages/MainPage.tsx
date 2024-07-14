import '../index.css';

import { useCallback, useEffect, useState } from 'react';

import queryString from 'query-string';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Person } from '../interfaces';
import ErrorBoundary from '../components/ErrorBoundary';
import Pagination from '../components/Pagination';
import PeopleList from '../components/PeopleList';
import Search from '../components/Search';

import { useSearchQuery } from '../utils';
import { apiRoot } from '../Constants';

const ROWS_PER_PAGE = 10;

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchText: initialSearchText = '', page: initialPage = 1 } =
    queryString.parse(location.search);

  const [displayText, setDisplayText] = useState<string>(
    initialSearchText as string
  );

  const [searchText, setSearchText] = useSearchQuery(
    initialSearchText as string
  );

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(
    parseInt(initialPage as string) || 1
  );
  const [resultCount, setResultCount] = useState<number>(0);
  const pageCount = Math.ceil(resultCount / ROWS_PER_PAGE);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayText(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateURLParams({ searchText: displayText });
    setSearchText(displayText);
  }

  const updateURLParams = useCallback(
    (params: { searchText?: string; page?: number }) => {
      const newParams = { ...queryString.parse(location.search), ...params };
      navigate({ search: queryString.stringify(newParams) });
    },
    [location.search, navigate]
  );

  const fetchData = useCallback(async () => {
    navigate('/');
    setIsLoading(true);
    const url = searchText
      ? `${apiRoot}?search=${encodeURIComponent(searchText)}`
      : `https://swapi.dev/api/people/?page=${page}`;
    updateURLParams({ searchText: displayText });
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
  }, [displayText, navigate, page, searchText, updateURLParams]);

  useEffect(() => {
    fetchData();
  }, [page, searchText, fetchData]);

  function handleNextPageClick() {
    if (page < pageCount) {
      const newPage = page + 1;
      updateURLParams({ page: newPage });
      setPage(newPage);
    }
  }

  function handlePrevPageClick() {
    if (page > 1) {
      const newPage = page - 1;
      updateURLParams({ page: newPage });
      setPage(newPage);
    }
  }

  return (
    <>
      <div className="app">
        <header className="header">
          <h1>Star Wars People Finders</h1>
          <Search
            onChange={handleChange}
            onSearch={handleSearch}
            searchText={displayText}
          />
        </header>
        <main className="main">
          <ErrorBoundary>
            <>
              <div className="people-wrapper">
                {isLoading ? (
                  <div className="preloader"></div>
                ) : (
                  <PeopleList people={people} />
                )}{' '}
                <div className="person-detail">
                  <Outlet />
                </div>
              </div>
              {!isLoading && pageCount > 1 && (
                <Pagination
                  onNextPageClick={handleNextPageClick}
                  onPrevPageClick={handlePrevPageClick}
                  disable={{
                    left: page === 1,
                    right: page === pageCount,
                  }}
                  nav={{ current: page, total: pageCount }}
                />
              )}
            </>
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
}
