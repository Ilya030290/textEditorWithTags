import React from 'react';

import { getActiveWordsByTag } from '../../helpers/helperFunctions';
import { NoteProps } from '../../types/types';
import EditIcon from '../../assets/free-icon-edit-5186659.png';
import DeleteIcon from '../../assets/delete.png';
import VerifyIcon from '../../assets/verified.png';
import styles from './EditableInput.module.scss';
import noteStyles from '../NotesList/Note/Note.module.scss';

const EditableInput = ({ note, deleteNote, changeNoteText }: NoteProps) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [newTitle, setNewTitle] = React.useState<string>(note.title);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onClickEdit = () => {
    setIsEdit(true);
    setNewTitle(note.title);
  };

  const onClickHandler = () => {
    changeNoteText(note.id, newTitle);
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <input
              className={styles.editableInput}
              value={newTitle}
              onChange={onChangeHandler}
              onBlur={onClickHandler}
            />
            <button className={styles.saveButton} onClick={onClickHandler}>
              <img src={VerifyIcon} alt="verifyIcon" />
            </button>
          </div>
          <p className={noteStyles.title}>{isEdit && getActiveWordsByTag(note.title)}</p>
        </div>
      ) : (
        <>
          <p className={noteStyles.title} onDoubleClick={onClickEdit}>
            {note.title}
          </p>
          <div className={noteStyles.buttonGroup}>
            <button className={noteStyles.button} onClick={onClickEdit}>
              <img src={EditIcon} alt="editIcon" />
            </button>
            <button className={noteStyles.button} onClick={() => deleteNote(note.id)}>
              <img src={DeleteIcon} alt="deleteIcon" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EditableInput;
