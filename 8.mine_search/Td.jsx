import React, {useContext} from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch(code){
    case CODE.NORMAL:
    case CODE.MINE:
      return{
        background: '#444444',
        color: '#ffffff',
      };
    case CODE.OPENED:
      return{
        background: '#ffffff',
        color: '#444444',
      };
    default:
      return{
        background: '#ffffff',
        color: '#444444',
      };
  }
};

const getTdText = (code) => {
  switch(code){
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    default:
      return '';
  }
};

const Td = ( {rowIndex, cellIndex} ) => {
  const {tableData} = useContext(TableContext);

  return(
    <td style={getTdStyle(tableData[rowIndex][cellIndex])}
    >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
};

export default Td;