import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(( {rowIndex, cellIndex, dispatch, cellData} ) => {
  console.log('td rendered');

  //문제 발생했을때 확인하는 법, useRef, useEffect 사용하여 검사
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    console.log(cellData);
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);
  // 문제 검사 끝

  const onClickTd = useCallback(() => {
    console.log(cellData);
    console.log(rowIndex, cellIndex);
    if(cellData){
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return(
    <td onClick={onClickTd}>{ cellData }</td>
  )
});

export default Td;