import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState, IData, INote } from '../types/types';
import { AppReducer } from '../constants/constants';

const initialState: AppState = {
  textAreaValue: '',
  searchTagValue: '',
  jsonData: JSON.stringify({ notes: [], currentTags: [], uniqueTags: [] }),
};

const slice = createSlice({
  name: AppReducer,
  initialState,
  reducers: {
    setNoteText: (state, action: PayloadAction<string>) => {
      state.textAreaValue = action.payload;
    },
    setTagValue: (state, action: PayloadAction<string>) => {
      state.searchTagValue = action.payload;
    },
    setTagNote: (state, action: PayloadAction<string>) => {
      const data: IData = JSON.parse(state.jsonData);
      const arrOfStrings = action.payload.split(/(#[a-z\d-]+)/gi);
      const arrWithCurrentTags: string[] = [];

      arrOfStrings.forEach((item) => {
        if (item.charAt(0) === '#') {
          arrWithCurrentTags.push(item);
        }
      });
      data.currentTags = arrWithCurrentTags;
      state.jsonData = JSON.stringify(data);
    },
    addNoteToData: (state, action: PayloadAction<INote>) => {
      const data: IData = JSON.parse(state.jsonData);

      if (action.payload.title.trim().length !== 0) {
        data.notes.unshift(action.payload);
      }
      state.jsonData = JSON.stringify(data);
    },
    searchByTagName: (state, action: PayloadAction<string>) => {
      const data: IData = JSON.parse(state.jsonData);
      const foundIndex = data.notes.findIndex(
        (el) => el.noteTags.indexOf(action.payload) !== -1
      );

      data.notes.unshift(data.notes[foundIndex]);
      data.notes.splice(foundIndex + 1, 1);
      state.jsonData = JSON.stringify(data);
    },
    editNote: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const data: IData = JSON.parse(state.jsonData);
      const foundNote = data.notes.find((note) => note.id === action.payload.id);

      if (foundNote) {
        const arrOfStrings = action.payload.title.split(/(#[a-z\d-]+)/gi);
        const array: string[] = [];

        arrOfStrings.forEach((item) => {
          if (item.charAt(0) === '#') {
            array.push(item);
          }
        });
        foundNote.noteTags = Array.from(new Set(array));
        foundNote.title = action.payload.title;
      }
      state.jsonData = JSON.stringify(data);
    },
    setAllTags: (state) => {
      const data: IData = JSON.parse(state.jsonData);
      const newArr: string[] = [];

      data.notes.forEach((note) => note.noteTags.forEach((tag) => newArr.push(tag)));
      data.uniqueTags = Array.from(new Set(newArr));
      state.jsonData = JSON.stringify(data);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const data: IData = JSON.parse(state.jsonData);

      data.notes = data.notes.filter((el) => el.id !== action.payload);
      state.jsonData = JSON.stringify(data);
    },
    removeTag: (state, action: PayloadAction<string>) => {
      const data: IData = JSON.parse(state.jsonData);

      data.uniqueTags = data.uniqueTags.filter((tag) => tag !== action.payload);
      data.notes.forEach((note) => {
        note.title = note.title
          .split(/(#[a-z\d-]+)/gi)
          .map((el) => (el === action.payload ? el.slice(el.length, -1) : el))
          .join(' ');
        note.noteTags = note.noteTags.filter((tag) => tag !== action.payload);
      });
      state.jsonData = JSON.stringify(data);
    },
  },
});

export const appSlice = slice.reducer;

export const {
  setNoteText,
  removeNote,
  setTagNote,
  addNoteToData,
  setTagValue,
  searchByTagName,
  setAllTags,
  editNote,
  removeTag,
} = slice.actions;
