import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState, INote } from '../types/types';
import { AppReducer } from '../constants/constants';

const initialState: AppState = {
  textAreaValue: '',
  searchTagValue: '',
  data: [],
  tags: [],
  allUniqueTags: [],
  jsonData: '',
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
      const arrOfStrings = action.payload.split(/(#[a-z\d-]+)/gi);
      const array: string[] = [];

      arrOfStrings.forEach((item) => {
        if (item.charAt(0) === '#') {
          array.push(item);
        }
      });
      state.tags = array;
    },
    addNoteToData: (state, action: PayloadAction<INote>) => {
      if (action.payload.title.length !== 0) {
        state.data.unshift(action.payload);
        state.jsonData = JSON.stringify({
          notes: state.data,
          uniqueTags: state.allUniqueTags,
        });
      }
    },
    searchByTagName: (state, action: PayloadAction<string>) => {
      const foundIndex = state.data.findIndex(
        (el) => el.tag.indexOf(action.payload) !== -1
      );

      state.data.unshift(state.data[foundIndex]);
      state.data.splice(foundIndex + 1, 1);
    },
    editNote: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const foundNote = state.data.find((note) => note.id === action.payload.id);

      if (foundNote) {
        const arrOfStrings = action.payload.title.split(/(#[a-z\d-]+)/gi);
        const array: string[] = [];

        arrOfStrings.forEach((item) => {
          if (item.charAt(0) === '#') {
            array.push(item);
          }
        });
        foundNote.tag = Array.from(new Set(array));
        foundNote.title = action.payload.title;
      }
      state.jsonData = JSON.stringify({
        notes: state.data,
        uniqueTags: state.allUniqueTags,
      });
    },
    setAllTags: (state) => {
      const newArr: string[] = [];

      state.data.forEach((note) => note.tag.forEach((tag) => newArr.push(tag)));
      state.allUniqueTags = Array.from(new Set(newArr));
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((el) => el.id !== action.payload);
      state.jsonData = JSON.stringify({
        notes: state.data,
        uniqueTags: state.allUniqueTags,
      });
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.allUniqueTags = state.allUniqueTags.filter((tag) => tag !== action.payload);
      state.data.forEach((note) => {
        note.title = note.title
          .split(' ')
          .filter((el) => el !== action.payload)
          .join(' ');
        note.tag = note.tag.filter((tag) => tag !== action.payload);
      });
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
