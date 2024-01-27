import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from "./utils/auth";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Notes from './pages/Notes';
import NoteForm from './components/NoteForm';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={isAuthenticated() ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={isAuthenticated() ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/add" element={isAuthenticated() ? <NoteForm isEdit={false}/> : <Navigate to="/login" />} />
          <Route path="/:noteId/edit" element={isAuthenticated() ? <NoteForm isEdit={true}/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;