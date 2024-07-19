import '../index.css';

import { useCallback, useEffect, useState } from 'react';

import queryString from 'query-string';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Person } from '../interfaces';
import ErrorBoundary from '../components/ErrorBoundary';
import Pagination from '../components/Pagination';
import PeopleList from '../components/PeopleList';
import Search from '../components/Search';

import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils';
import { BASE_URL, PAGINATION_PAGE } from '../constants';
import { useDispatch, useSelector } from 'react-redux';

import {
  setIsLoading,
  setPage,
  setPeople,
  setResultCount,
  setSearchText,
} from '../stores/peopleSlice';
import { RootState } from '../stores/reducers';

export default function MainPage() {
  const dispatch = useDispatch();
  const { searchText, page, isLoading, resultCount, people } = useSelector(
    (state: RootState) => state.people
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState<string>(
    getItemFromLocalStorage('searchText' || '')
  );
  const pageCount = Math.ceil(resultCount / PAGINATION_PAGE);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayText(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSearchText(displayText));
    updateURLParams({ searchText: displayText });
    setItemToLocalStorage('searchText', displayText);
  }

  function updateURLParams(params: { searchText?: string; page?: number }) {
    const newParams = { ...queryString.parse(location.search), ...params };
    navigate({ search: queryString.stringify(newParams) });
  }

  const fetchData = useCallback(async () => {
    navigate('/');
    dispatch(setIsLoading(true));
    const url = searchText
      ? `${BASE_URL}?search=${encodeURIComponent(searchText)}`
      : `${BASE_URL}?page=${page}`;
    updateURLParams({ searchText, page });
    try {
      const response = await fetch(url);
      const res = await response.json();
      const people: Person[] = res.results;
      dispatch(setPeople(people));
      dispatch(setResultCount(res.count));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [searchText, page, dispatch, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleNextPageClick() {
    if (page < pageCount) {
      const newPage = page + 1;
      updateURLParams({ page: newPage });
      dispatch(setPage(newPage));
    }
  }

  function handlePrevPageClick() {
    if (page > 1) {
      const newPage = page - 1;
      updateURLParams({ page: newPage });
      dispatch(setPage(newPage));
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
