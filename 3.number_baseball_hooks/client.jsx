import React from 'react';
import ReactDom from 'react-dom';
// 리액트와 리액트 돔을 불러옴

import NumberBaseball from './NumberBaseball';

ReactDom.render(<NumberBaseball />, document.querySelector('#root'));