import React from 'react';

export const getActiveWordsByTag = (title: string) => {
  const tagsArr: string[] = [];

  title.split(/(#[a-z\d-]+)/gi).forEach((el) => {
    if (el.charAt(0) === '#') {
      tagsArr.push(el.slice(1, el.length));
    }
  });

  const resultArr = title.split(' ').map((item, index) => {
    if (tagsArr.indexOf(item) !== -1) {
      return <em key={index}>&nbsp;{item}&nbsp;</em>;
    } else {
      return <span key={index}>&nbsp;{item}&nbsp;</span>;
    }
  });

  return resultArr;
};
