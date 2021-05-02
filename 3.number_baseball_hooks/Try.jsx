import React, { PureComponent, memo } from 'react';

// class Try extends PureComponent{
//     render(){
//         const { tryInfo } = this.props;
//         return(
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }

const Try = memo(({ tryInfo }) => {
    //props는 자식에서 변경하고싶으면 state로 변경해서 작업한다.
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

export default Try;