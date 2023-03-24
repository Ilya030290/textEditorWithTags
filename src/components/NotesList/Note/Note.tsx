import React from 'react';

import EditableInput from '../../EditableInput';
import { NoteProps } from '../../../types/types';
import styles from './Note.module.scss';

const Note = ({ note, deleteNote, changeNoteText }: NoteProps) => {
  return (
    <div className={styles.noteContainer}>
      <div className={styles.description}>
        <EditableInput
          note={note}
          deleteNote={deleteNote}
          changeNoteText={changeNoteText}
        />
      </div>
      <div className={styles.tagGroup}>
        {note.tag.length > 0
          ? note.tag.map((el, index) => (
              <span className={styles.tag} key={index}>
                {el}
              </span>
            ))
          : null}
      </div>
    </div>
  );
};

export default Note;
