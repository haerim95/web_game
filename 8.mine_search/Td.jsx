import React, {useCallback, useContext} from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch(code){
    case CODE.NORMAL:
    case CODE.MINE:
      return{
        background: '#444444',
        color: '#ffffff',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return{
        background: '#ffffff',
        color: '#444444',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return{
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return{
        background: 'red',
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
    case CODE.CLICKED_MINE:
      return '펑!';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};

const Td = ( {rowIndex, cellIndex} ) => {
  const {tableData, dispatch, halted} = useContext(TableContext);

  const onClickTd = useCallback( () => {
    if(halted){
      return;
    }
    switch(tableData[rowIndex][cellIndex]){
      //클릭이 안되게 하는 부분
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return; //끝
      case CODE.NORNAL: //보통인 칸, 클릭하면 열림
        dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.MINE: //지뢰칸 펑 ! 터진다
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
    
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback( (e) => {
    e.preventDefault(); // 오른쪽 마우스 클릭할시 나오는 메뉴 안나오게끔하기 위해
    if(halted){
      return;
    }
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL: //일반칸은 깃발칸
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.FLAG_MINE: //깃발칸은 물음표 컨
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return;
        case CODE.QUESTION_MINE: // 물음표 칸은 일반 칸
      case CODE.QUESTION: 
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
      // 서로서로 순환구조임 일반->깃발->물음표->일반
    }
  }, [tableData[rowIndex][cellIndex], halted])

  return(
    <td 
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
};

export default Td;