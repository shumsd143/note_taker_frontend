import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNote, getNoteById, updateNote } from '../services/noteService';

const NoteForm = ({ isEdit }) => {
  const [note, setNote] = useState({ title: '', content: '' });

  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(isEdit){
      setData()
    }
  }, []);

  const setData = async () => {
    try {
      const response = await getNoteById(noteId)
      setNote(response) 
    } catch (error) {
      console.error(error)
      navigate('/')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isEdit){
        await updateNote(noteId, note)
      }
      else{
        await createNote(note)
      }
      navigate('/')
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ width: '450px' }}>
        <h2 className="mb-4 text-center">Note Form</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={note.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
