import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = { //state들을 저장...
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', ''],
  ],
  recentCell: [-1. -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAGE = 'RESET_GAGE';

const reducer = (state, action) => {
  switch(action.type){
    case SET_WINNER: 
      //state.winner = action.winner; 이렇게 직접 바꿔주면 안됨
      return{
        ...state, //state 복사. 
        winner: action.winner,
      };
    case CLICK_CELL:{
      const tableData = [...state.tableData]; 
      // ... 얉은 복사를 해주는 이유 : 불변성을 지키기 위해.
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 문제 해결
      tableData[action.row][action.cell] = state.turn;
      return{
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN : {
      return{
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAGE : {
      return{
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', ''],
        ],
        recentCell: [-1. -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  //const [winner, setWinner] = useState('');
  //const [trun, setTrun] = useState('');
  //const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); //3x3 이므로 2차원 배열로 작성해주자.

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' });//dispatcH 안의 객체는 action
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0){
      return;
    }
    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){ //가로줄 검사
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){ //세로줄 검사
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){ //대각선 검사
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){ //대검사 검사2
      win = true;
    }
    if(win){ // 승리시
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESET_GAGE});
    }else{
      let all = true; // all이 true면 무승부라는 뜻.
      tableData.forEach((row) => { // 무승부 검사
        row.forEach( (cell) => {
          if(!cell){
            all = false;
          }          
        });
      });
      if(all){
        dispatch({type: RESET_GAGE});
      }else{
        dispatch({type: CHANGE_TURN});
      }
    }
  }, [recentCell])

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner} 님의 승리!</div>}
    </>
  );
};

export default TicTacToe;