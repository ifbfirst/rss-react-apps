import ErrorBoundary from '../components/ErrorBoundary';
import FlyoutBox from '../components/FlyoutBox';
import Pagination from '../components/Pagination';
import PeopleList from '../components/PeopleList';
import Search from '../components/Search';
import { BASE_URL, PAGINATION_PAGE } from '../constants';
import { setPage, setPageCount, setPeople } from '../stores/peopleSlice';
import { RootState } from '../stores/reducers';

import { updateURLParams } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DetailsPage from './details/[detailsId]';
import { PeopleResponse, Person } from '../interfaces/interfaces';
import { useRouter } from 'next/router';
import React from 'react';
import { useFetchPeopleQuery } from '../services/peopleApi';
import { ThemeContext, themes } from '../theme/ThemeContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars People Finder',
  icons: {
    icon: '/favicon.ico',
  },
};

const MainPage = ({
  initialData,
  initialPageCount,
}: {
  initialData: PeopleResponse;
  initialPageCount: number;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { searchText, page, personList, people, pageCount } = useSelector(
    (state: RootState) => state.people
  );
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { data, isFetching } = useFetchPeopleQuery(
    { searchText, page },
    { skip: isFirstLoad && searchText.length === 0 }
  );

  const [selectedPerson, setSelectedPerson] = useState('');
  const { detailsId } = router.query;

  useEffect(() => {
    if (initialData && initialData.results) {
      dispatch(setPeople(initialData.results));
      dispatch(setPageCount(initialPageCount));
    }
  }, [initialData, dispatch, initialPageCount]);

  useEffect(() => {
    if (data) {
      dispatch(setPeople(data.results));
      dispatch(
        setPageCount(data.count ? Math.ceil(data.count / PAGINATION_PAGE) : 0)
      );
      setIsFirstLoad(false);
    }
  }, [data, dispatch, people]);

  useEffect(() => {
    if (detailsId && people) {
      const person = people.find((p) => p.name === detailsId);
      setSelectedPerson(person?.name || '');
    }
  }, [detailsId, people]);

  function handleNextPageClick() {
    const newPage = page + 1;
    if (newPage <= pageCount) {
      updateURLParams({ page: newPage });
      dispatch(setPage(newPage));
    }
  }

  function handlePrevPageClick() {
    const newPage = page - 1;
    if (newPage >= 1) {
      updateURLParams({ page: newPage });
      dispatch(setPage(newPage));
    }
  }

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person.name);
  };

  const handleCloseDetails = () => {
    setSelectedPerson('');
    router.push('/');
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="header">
          <p className="theme_selector">
            Change theme
            <ThemeContext.Consumer>
              {({ theme, setTheme }) => (
                <i
                  className="fa-solid fa-sun light"
                  data-testid="theme-switch"
                  onClick={() => {
                    if (theme === themes.light) setTheme(themes.dark);
                    if (theme === themes.dark) setTheme(themes.light);
                  }}
                />
              )}
            </ThemeContext.Consumer>
          </p>
          <h1>Star Wars People Finders</h1>
          <Search />
        </header>
        <main className="main">
          <div className="people-wrapper">
            {isFetching ? (
              <div className="preloader" data-testid="loader"></div>
            ) : (
              <>
                <PeopleList
                  people={people || []}
                  onPersonSelect={handlePersonSelect}
                />
                <div className="person-detail">
                  {selectedPerson && (
                    <DetailsPage
                      personName={selectedPerson}
                      onClose={handleCloseDetails}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {pageCount > 1 && (
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
          {personList.length !== 0 && <FlyoutBox />}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;
