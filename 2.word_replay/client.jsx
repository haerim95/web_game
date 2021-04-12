const React = require('react');
const ReactDom = require('react-dom');
// 리액트와 리액트 돔을 불러옴

const WordRelay = require('./WordRelay'); //WordRelay 불러오기

ReactDom.render(<WordRelay />, document.querySelector('#root'));