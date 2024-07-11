import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default Page404;
