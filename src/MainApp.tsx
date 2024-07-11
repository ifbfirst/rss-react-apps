import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from './components/Page404';
import App from './App';

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
