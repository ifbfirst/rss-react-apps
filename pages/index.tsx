import ErrorBoundary from '@/components/ErrorBoundary';
import FlyoutBox from '@/components/FlyoutBox';
import Pagination from '@/components/Pagination';
import PeopleList from '@/components/PeopleList';
import Search from '@/components/Search';
import { PAGINATION_PAGE } from '@/constants';
import { setPage } from '@/stores/peopleSlice';
import { RootState, useFetchPeopleQuery } from '@/stores/reducers';
import { ThemeContext, themes } from '@/theme/ThemeContext';
import { updateURLParams } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DetailsPage from './[detailsId]';
import { Person } from '@/interfaces';

const MainPage = () => {
  const dispatch = useDispatch();
  const { searchText, page, personList } = useSelector(
    (state: RootState) => state.people
  );
  const { data, isFetching } = useFetchPeopleQuery({ searchText, page });
  const pageCount = data?.count ? Math.ceil(data.count / PAGINATION_PAGE) : 0;

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  function handleNextPageClick() {
    if (pageCount && page < pageCount) {
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

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleCloseDetails = () => {
    setSelectedPerson(null);
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
                  people={data?.results || []}
                  onPersonSelect={handlePersonSelect}
                />
                <div className="person-detail">
                  {selectedPerson && (
                    <DetailsPage
                      person={selectedPerson}
                      onClose={handleCloseDetails}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {!isFetching && pageCount > 1 && (
            <Pagination
              onNextPageClick={handleNextPageClick}
              onPrevPageClick={handlePrevPageClick}
              disable={{
                left: page === 1,
                right: page === data?.count,
              }}
              nav={{ current: page, total: pageCount }}
            />
          )}
          {!isFetching && personList.length !== 0 && <FlyoutBox />}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;
