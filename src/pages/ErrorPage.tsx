import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  if (error instanceof Error) {
    console.error(error);
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error instanceof Error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ErrorPage;
