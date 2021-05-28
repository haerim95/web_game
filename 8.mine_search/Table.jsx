import React, { useContext, memo } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return(
    <table>
        {/* 행수,열수로 반복문 돌려서 tr,td만들어주기 */}
        {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </table>
  )
});

export default Table;