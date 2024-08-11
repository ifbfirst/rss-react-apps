'use client';
import { useEffect, useState } from 'react';
import PeopleList from '../components/PeopleList';
import Pagination from '../components/Pagination';
import { PeopleResponse, Person } from '../interfaces/interfaces';
import { Provider } from 'react-redux';
import store from '../stores/store';
import DetailsPage from './details/page';
import { useRouter, useSearchParams } from 'next/navigation';
import { PAGINATION_PAGE } from '../constants';
import { fetchPeople } from './api';
import ThemeProvider from './theme/ThemeProvider';
import { ThemeContext, themes } from './theme/ThemeContext';

const MainContent = ({ initialData }: { initialData: PeopleResponse }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [people, setPeople] = useState<Person[]>(initialData.results);
  const [pageCount, setPageCount] = useState(
    initialData.count ? Math.ceil(initialData.count / PAGINATION_PAGE) : 0
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(displayText);

  useEffect(() => {
    const savedSearchText = localStorage.getItem('searchText');
    if (savedSearchText) {
      setDisplayText(savedSearchText);
      fetchData(savedSearchText, currentPage);
    } else {
      setPeople(initialData.results);
    }
  }, [currentPage, initialData.results]);

  const fetchData = async (search: string, page: number) => {
    const newData = await fetchPeople(search, page);
    setPeople(newData.results);
    setPageCount(
      newData.count ? Math.ceil(newData.count / PAGINATION_PAGE) : 0
    );
  };

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person.name);
  };

  const handleCloseDetails = () => {
    setSelectedPerson('');
    router.push('/');
  };

  const updateUrl = (newPage: number) => {
    const newSearch = new URLSearchParams(window.location.search);
    newSearch.set('page', newPage.toString());
    newSearch.set('search', searchTerm);
    router.push(`?${newSearch.toString()}`);
  };

  const handleNextPageClick = () => {
    const newPage = currentPage + 1;
    if (newPage <= pageCount) {
      setCurrentPage(newPage);
      updateUrl(newPage);
    }
  };

  const handlePrevPageClick = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) {
      setCurrentPage(newPage);
      updateUrl(newPage);
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayText(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchTerm(displayText);
    const newSearch = new URLSearchParams(window.location.search);
    newSearch.set('search', searchTerm);
    router.push(`?${newSearch.toString()}`);
    localStorage.setItem('searchText', searchTerm);
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
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
          <form className="search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder=""
              className="search__input"
              onChange={handleChange}
              value={displayText}
            />
            <button className="search__button" type="submit">
              search
            </button>
          </form>
        </header>
        <div className="people-wrapper">
          <PeopleList people={people} onPersonSelect={handlePersonSelect} />
          <div className="person-detail">
            {selectedPerson && (
              <div>
                <DetailsPage
                  personName={selectedPerson}
                  onClose={handleCloseDetails}
                />
              </div>
            )}
          </div>
        </div>
        {pageCount > 1 && (
          <Pagination
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: currentPage === 1,
              right: currentPage === pageCount,
            }}
            nav={{ current: currentPage, total: pageCount }}
          />
        )}
      </ThemeProvider>
    </Provider>
  );
};

export default MainContent;
function fetchData(savedSearchText: string, currentPage: number) {
  throw new Error('Function not implemented.');
}
