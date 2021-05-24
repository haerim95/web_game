import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION : -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -4,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},

});

const initialState = {
  tableData : [],
  timer: 0,
  result: '',
};

const plantMine = (row, cell, mine) => { //지뢰 심기
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => { //0~99 출력
    return i;
  });

  const shuffle = [];
  while(candidate.length > row * cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]; //0~99 숫자 랜덤 생성 
    shuffle.push(chosen);
  }

  const data = [];
  for (let i=0; i < row; i++){ 
    //2차원 배열 생성
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }

  //위에서 셔플 정리로 뽑은 칸을
  for (let k = 0; k < shuffle.length; k++){
    // 지뢰가 몇 콤마 몇인지 계산
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE; //뽑은 자리에 지뢰를 심음
  }

  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch(action.type){
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(()=> ({ tableData: state.tableData, dispatch }), [state.tableData]);

  return (
    //createContext를 사용하기 위해선 provider로 한 번 감싸야한다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;