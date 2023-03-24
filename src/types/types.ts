import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { rootReducer } from '../redux/store';

export type AppRootActionsType = AnyAction;
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type DispatchActionType = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppRootActionsType
>;
export const useAppDispatch = () => useDispatch<DispatchActionType>();

export interface AppState {
  textAreaValue: string;
  searchTagValue: string;
  data: INote[];
  tags: string[];
  allUniqueTags: string[];
  jsonData: string;
}

export interface INote {
  id: string;
  title: string;
  tag: string[];
}
export type NoteProps = {
  note: INote;
  deleteNote: (id: string) => void;
  changeNoteText: (id: string, title: string) => void;
};
