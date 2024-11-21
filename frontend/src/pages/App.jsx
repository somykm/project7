import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import SignUp from './SignUp';
import Banner from '../components/Banner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/banner" element={<Banner />} />
      </Routes>
    </Router>
  );
}

export default App;
