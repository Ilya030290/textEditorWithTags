import React from 'react';

import Header from './components/Header';
import SearchBarByTag from './components/SearchBarByTag';
import NotesList from './components/NotesList';
import TagsContainer from './components/TagsContainer';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.wrapper}>
    <div className={styles.notesList}>
      <Header />
      <SearchBarByTag />
      <NotesList />
      <TagsContainer />
    </div>
  </div>
);

export default App;
