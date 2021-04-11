
const React = require('react');//npm에서 리액트를 불러와줘야한다
const { Component } = React;

class WordRelay extends Component {
    state = {
        text: 'Hello, webpack',
    };

    render() {
        return <h1>{this.state.text}</h1>
    }
}


module.exports = WordRelay;
//이렇게 꼭 적어줘야만 다른 곳에서 사용이 가능하다