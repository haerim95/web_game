import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION : -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
}

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},

});

const initialState = {
  tableData : [],
  timer: 0,
  result: '',
  halted: true,
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
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch(action.type){
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      }
    };
    case OPEN_CELL : {
      // 불변성 유지를 위해 ...으로 저장
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      const checkArround = (row, cell) => { //내 기준으로 칸을 검사하는 함수
        if([CODE.OPENED, CODE.FLAG_MINE, CODE_FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
          
        }
        let around = [];
        if(tableData[row -1]){ //윗줄이 있을때
          around = around.concat( // 윗줄 세칸 검사
            tableData[row -1][cell -1], 
            tableData[row -1][cell],
            tableData[row -1][cell + 1],
            );
        };
        around = around.concat(
          tableData[row -1][cell -1], 
          tableData[row -1][cell + 1],
        );
        if(tableData[row + 1]){ //아랫줄 검사
          around = around.concat(
            tableData[row +1][cell -1], 
            tableData[row +1][cell],
            tableData[row +1][cell + 1],
          );
        };
        const count = around.filter((v) => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(v)).length;
        console.log(around, count)
        tableData[row][cell] = count;
        if(count === 0){ // 주변 칸들이 없을 때
          const near = [];
          if(row -1 > -1){ // 제일 윗칸을 클릭
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell -1]);
          near.push([row, cell +1]);
          if(row +1 > tableData.length){ //제일 아랫칸 클릭
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.filter(v => !!v).forEach((n)=>{
            checkArround(n[0], n[1]);
          });
        }else{
          
        }
      };
      checkArround(action.row, action.cell);
      return{
        ...state,
        tableData,
      };
    };
    case CLICK_MINE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE; //클릭한 셀이 opned로 변경
      return{
        ...state,
        tableData,
        halted: true,
      }
    };
    case FLAG_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.MINE){
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      }else{
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return{
        ...state,
        tableData,
      }
    };
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.FLAG_MINE){ //지뢰가 있는 깃발일때
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      }else{
        tableData[action.row][action.cell] = CODE.QUESTION; //지뢰가 없는 깃발일때
      }
      return{
        ...state,
        tableData,
      }
    };
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){ //물음표 칸에서 지뢰가 있을 때
        tableData[action.row][action.cell] = CODE.MINE;
      }else{
        tableData[action.row][action.cell] = CODE.NORMAL; //물음표 칸에서 지뢰가 없을 때
      }
      return{
        ...state,
        tableData,
      }
    };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(()=> ({ tableData, halted, dispatch }), [tableData, halted]);

  return (
    //createContext를 사용하기 위해선 provider로 한 번 감싸야한다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;