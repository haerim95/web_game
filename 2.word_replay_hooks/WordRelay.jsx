
const React = require('react');//npm에서 리액트를 불러와줘야한다
const { useState, useRef } = React;

const WordRelay = () =>{

    const [word, setWord] = useState('힐다');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null);


    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length - 1] === value[0]){
            //정답
            setResult('딩동댕');
            setWord(value);
            value('');
            inputRef.current.focus(); //hooks 에는 current 꼭 붙여줘야한다.
        }else{
            //오답
            setResult('땡!');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value)
    };


    // hook는 render 필요옶음
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    )
}


module.exports = WordRelay;
//이렇게 꼭 적어줘야만 다른 곳에서 사용이 가능하다