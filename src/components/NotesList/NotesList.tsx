import React from 'react';
import { useSelector } from 'react-redux';

import { INote, useAppDispatch } from '../../types/types';
import { editNote, removeNote, setAllTags, setTagNote } from '../../redux/appSlice';
import { selectJsonData } from '../../redux/selectors';
import Note from './Note';
import styles from './NotesList.module.scss';

const NotesList = () => {
  const data = JSON.parse(useSelector(selectJsonData));
  const dispatch = useAppDispatch();

  const changeNoteText = (id: string, title: string) => {
    dispatch(editNote({ id, title }));
    dispatch(setTagNote(title));
    dispatch(setAllTags());
  };

  const deleteNote = (id: string) => {
    dispatch(removeNote(id));
    dispatch(setAllTags());
  };

  return (
    <section className={styles.notesListContainer}>
      {data.notes.length > 0
        ? data.notes.map((note: INote) => (
            <Note
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              changeNoteText={changeNoteText}
            />
          ))
        : null}
    </section>
  );
};

export default NotesList;
