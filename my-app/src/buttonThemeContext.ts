// buttonTheme.ts
import React from 'react';
import heartEmpty from './heartEmpty.svg';
import heartFull from './heartFull.png';


export const likeButtonThemes = {
  unlike: heartEmpty,
  like: heartFull
}

export const buttonThemeContext = React.createContext(likeButtonThemes.unlike);