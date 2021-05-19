import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = { //state들을 저장...
  winner: '',
  trun: '0',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']],
}

const reducer = (satate, action) => {
  switch(action.type){
    case 'SET_WINNER' : 
      //state.winner = action.winner; 이렇게 직접 바꿔주면 안됨
      return{
        ...state, //state 복사. 
        winner: action.winner,
      };
  }
};

const TicTacToe = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  //const [winner, setWinner] = useState('');
  //const [trun, setTrun] = useState('');
  //const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); //3x3 이므로 2차원 배열로 작성해주자.

  const onClickTable = useCallback(()=>{
    dispatch({ type: 'SET_WINNER', winner: '0' }) //dispatcH 안의 객체는 action
  }, []);

  return (
    <>
      <Table onClicck={onClickTable}/>
      { satate.winner && <div>{state.winner} 님의 승리!</div> }
    </>
  );
};

export default TicTacToe;