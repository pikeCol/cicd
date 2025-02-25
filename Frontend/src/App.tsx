import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Playlist from './pages/PlaylistInput';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgotpass from './pages/Forgotpass';

function App() {
  return (
    <Router>
    <>
       <div>
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myplaylist" element={<Playlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgotpass" element={<Forgotpass/>} />
      </Routes>
    </>
    </Router>
  )
}

//Every component needs to be exported to be considered "complete"
export default App
