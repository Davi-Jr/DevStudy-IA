import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import DashBoardPage from './components/DashBoardPage';
import RoadmapPage from './components/RoadmapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/roadmaps" element={<RoadmapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
