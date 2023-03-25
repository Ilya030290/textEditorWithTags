import React from 'react';
import { useSelector } from 'react-redux';

import { IData, useAppDispatch } from '../../types/types';
import { removeTag } from '../../redux/appSlice';
import { selectJsonData } from '../../redux/selectors';
import DeleteIcon from '../../assets/delete.png';
import styles from './TagsContainer.module.scss';

const TagsContainer = () => {
  const data: IData = JSON.parse(useSelector(selectJsonData));
  const allUniqueTags = data.uniqueTags;
  const dispatch = useAppDispatch();

  const deleteTag = (tag: string) => {
    dispatch(removeTag(tag));
  };

  return (
    <section className={styles.tagsContainer}>
      {allUniqueTags.length > 0
        ? allUniqueTags.map((tag, index) => (
            <div className={styles.tag} key={index}>
              <div className={styles.tagDescription}>
                <span className={styles.tagTitle}>{tag}</span>
                <button className={styles.deleteButton} onClick={() => deleteTag(tag)}>
                  <img src={DeleteIcon} alt="deleteIcon" />
                </button>
              </div>
            </div>
          ))
        : null}
    </section>
  );
};

export default TagsContainer;
