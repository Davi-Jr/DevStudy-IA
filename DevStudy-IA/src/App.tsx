import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import DashBoardPage from './components/DashBoardPage';
import RoadmapPage from './components/RoadmapPage';
import ProfilePage from './components/ProfilePage';
import StudySessionPage from './components/StudySessionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/roadmaps" element={<RoadmapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/study-session" element={<StudySessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
