import { BASE_URL } from '@/constants';

export async function fetchPeople(searchText: string, page: number) {
  const url = searchText
    ? `${BASE_URL}?search=${encodeURIComponent(searchText)}`
    : `${BASE_URL}?page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
