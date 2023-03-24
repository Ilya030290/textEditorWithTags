import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addNoteToData, setAllTags, setNoteText, setTagNote } from '../../redux/appSlice';
import { selectTags, selectTextAreaValue } from '../../redux/selectors';
import { INote, useAppDispatch } from '../../types/types';
import styles from './Header.module.scss';

const Header = () => {
  const textAreaValue = useSelector(selectTextAreaValue);
  const tags = useSelector(selectTags);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNoteText(e.target.value));
    dispatch(setTagNote(e.target.value));
  };

  const addNote = () => {
    const newNote: INote = {
      id: uuidv4(),
      title: textAreaValue,
      tag: Array.from(new Set(tags)),
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
