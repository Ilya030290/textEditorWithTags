import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addNoteToData, setAllTags, setNoteText, setTagNote } from '../../redux/appSlice';
import { selectJsonData, selectTextAreaValue } from '../../redux/selectors';
import { INote, useAppDispatch } from '../../types/types';
import styles from './Header.module.scss';

const Header = () => {
  const data = JSON.parse(useSelector(selectJsonData));
  const textAreaValue = useSelector(selectTextAreaValue);
  const currentTags = data.currentTags;
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNoteText(e.target.value));
    dispatch(setTagNote(e.target.value));
  };

  const addNote = () => {
    const newNote: INote = {
      id: uuidv4(),
      title: textAreaValue,
      noteTags: Array.from(new Set(currentTags)),
    };

    dispatch(addNoteToData(newNote));
    dispatch(setNoteText(''));
    dispatch(setAllTags());
  };

  return (
    <header className={styles.headerContainer}>
      <textarea value={textAreaValue} onChange={handleChange} placeholder="Type text" />
      <button
        className={`${styles.headerButton} ${
          !textAreaValue ? styles.disabledButton : ''
        }`}
        disabled={!textAreaValue}
        onClick={addNote}
      >
        Add note
      </button>
    </header>
  );
};

export default Header;
