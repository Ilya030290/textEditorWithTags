import { createSelector } from '@reduxjs/toolkit';

import { AppRootStateType, INote } from '../types/types';

const getTextAreaValue = (state: AppRootStateType): string => state.app.textAreaValue;

export const selectTextAreaValue = createSelector(
  getTextAreaValue,
  (textAreaValue: string) => textAreaValue
);

const getTagName = (state: AppRootStateType): string => state.app.searchTagValue;

export const selectTagName = createSelector(
  getTagName,
  (searchTagValue: string) => searchTagValue
);

const getTags = (state: AppRootStateType): string[] => state.app.tags;

export const selectTags = createSelector(getTags, (tags: string[]) => tags);

const getAllUniqueTags = (state: AppRootStateType): string[] => state.app.allUniqueTags;

export const selectAllUniqueTags = createSelector(
  getAllUniqueTags,
  (uniqueTags: string[]) => uniqueTags
);

const getData = (state: AppRootStateType): INote[] => state.app.data;

export const selectData = createSelector(getData, (data: INote[]) => data);

const getJsonData = (state: AppRootStateType): string => state.app.jsonData;

export const selectJsonData = createSelector(getJsonData, (jsonData: string) => jsonData);
