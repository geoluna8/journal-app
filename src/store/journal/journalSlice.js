import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
/*         active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: [], // 'https://hola.com/imagen.jpg', 'https://hola.com/imagen2.jpg', 
        }, */
  },
  reducers: {
      savingNewNote: ( state ) => {
        state.isSaving = true;
      },
      addNewEmptyNote: (state, action) => {
        state.notes.push( action.payload );
        state.isSaving = false;
      },
      setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSaved = '';
      },
      setNotes: (state, action) => {
        state.notes = action.payload
      },
      setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
        // TODO: mensaje de error...
      },
      updateNote: (state, action) => { // payload: note
        state.isSaving = false;
        state.notes = state.notes.map( note => {
          if ( note.id === action.payload.id ) {
            return action.payload;
          }

          return note;
        });

        state.messageSaved = `${ action.payload.title } - actualizada correctamente`;
      },
      setToPhotosToActiveNote: (state, action) => {
        state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        state.isSaving = false;
      },
      clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
      },
      deleteNoteById: (state, action) => {
        state.active = null;
        state.notes = state.notes.filter( note => note.id !== action.payload );
      },
  }
});


export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setToPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;

// los reducers solo pueden ser operaciones sincronas