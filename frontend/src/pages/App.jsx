import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
export default App;
