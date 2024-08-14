import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <p> OOPS...Seems like an error occurred!</p>
      <Link to="/" className="btn-first">
        Go to back
      </Link>
    </div>
  );
};
export default ErrorPage;
