import { createSelector } from '@reduxjs/toolkit';

import { AppRootStateType } from '../types/types';

const getTextAreaValue = (state: AppRootStateType): string => state.app.textAreaValue;

export const selectTextAreaValue = createSelector(
  getTextAreaValue,
  (textAreaValue: string) => textAreaValue
);

const getTagValue = (state: AppRootStateType): string => state.app.searchTagValue;

export const selectTagValue = createSelector(
  getTagValue,
  (searchTagValue: string) => searchTagValue
);

const getJsonData = (state: AppRootStateType): string => state.app.jsonData;

export const selectJsonData = createSelector(getJsonData, (jsonData: string) => jsonData);
