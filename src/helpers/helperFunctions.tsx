import React from 'react';

import noteStyles from '../components/NotesList/Note/Note.module.scss';

export const getActiveWordsByTag = (title: string) => {
  const tagsArr: string[] = [];

  title.split(/(#[a-z\d-]+)/gi).forEach((el) => {
    if (el.charAt(0) === '#') {
      tagsArr.push(el.slice(1, el.length));
    }
  });

  const resultArr = title.split(' ').map((item, index) => {
    if (tagsArr.indexOf(item) !== -1) {
      return (
        <span className={noteStyles.activeSpan} key={index}>
          {item}
        </span>
      );
    } else {
      return (
        <span className={noteStyles.span} key={index}>
          {item}
        </span>
      );
    }
  });

  return resultArr;
};
