import React, {useContext, memo} from 'react';
import { TableContext } from './MineSearch';
import Td from './Td';

const Tr = memo(( {rowIndex} ) => {
  const { tableData } = useContext(TableContext);

  return(
    <tr>
      {/* tableData.0, tableData.0이 undifined로 뜰수도 있기 때문에 보호를 한번 해줌 */}
      {tableData[0] && Array(tableData[0].length).fill().map((td,i) => <Td rowIndex={rowIndex} cellIndex={i}/>)}
    </tr>
  )
});

export default Tr;