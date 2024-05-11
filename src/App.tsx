import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App