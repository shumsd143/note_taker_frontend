import { useState, useEffect } from 'react';
import { getNotes, deleteNote } from '../services/noteService';
import { Link, useNavigate } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleEdit = (noteId) => {
    navigate(`${noteId}/edit`)
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      // Refresh notes after deletion
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Notes List</h2>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Note
      </Link>
      {notes.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(note.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default Notes;