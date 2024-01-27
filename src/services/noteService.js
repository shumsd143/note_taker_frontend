import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const noteApi = axios.create({
  baseURL: API_BASE_URL + '/notes',
});

noteApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const createNote = async (noteData) => {
  try {
    const response = await noteApi.post('/', noteData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create note');
  }
};

export const getNotes = async () => {
  try {
    const response = await noteApi.get('/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch notes');
  }
};

export const getNoteById = async (noteId) => {
  try {
    const response = await noteApi.get(`/${noteId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch note');
  }
};

export const updateNote = async (noteId, updatedNoteData) => {
  try {
    const response = await noteApi.put(`/${noteId}`, updatedNoteData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update note');
  }
};

export const deleteNote = async (noteId) => {
  try {
    await noteApi.delete(`/${noteId}`);
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete note');
  }
};