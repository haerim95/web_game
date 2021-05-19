import React from 'react';
import Td from './Td';
import Table from './Table';

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return(
    <tr>
      {Array(rowData.length).fill().map((td, i)=>(
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowIndex[i]} >{''}</Td>
      ))}
    </tr>
  )
};

export default Tr;