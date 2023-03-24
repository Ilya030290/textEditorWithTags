import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../types/types';
import { searchByTagName, setTagValue } from '../../redux/appSlice';
import { selectTagName } from '../../redux/selectors';
import SearchIcon from '../../assets/free-icon-magnifier-2725317.png';
import styles from './SearchBarByTag.module.scss';

const SearchBarByTag = () => {
  const tagName = useSelector(selectTagName);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTagValue(e.target.value));
  };

  const searchByTag = () => {
    dispatch(searchByTagName(tagName));
    dispatch(setTagValue(''));
  };

  return (
    <section className={styles.searchBarContainer}>
      <input
        className={styles.searchInput}
        placeholder="Search notes by tag"
        value={tagName}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={searchByTag}>
        <img src={SearchIcon} alt="searchIcon" />
      </button>
    </section>
  );
};

export default SearchBarByTag;
