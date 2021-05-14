import React, { memo } from 'react';

//pure component처럼 만들고 싶으면 memo로 감싸주어야 한다.
//컴포넌트를 다른 컴포넌트로 바꾸는걸 high component

const Ball = memo( ({ number }) => { //얘는 훅스가 아님, state를 안쓰기 때문에 함수 컴포넌트로 만들어주는게 좋다. 그냥 함수 컴포넌트임
  //const {number} = this.props;
  let background;
  if (number <= 10){
    background = 'red';
  }else if(number <= 20){
    background = 'orange';
  }else if(number <= 30){
    background = 'yellow'
  }else if(number <= 40){
    background = 'blue'
  }else{
    background = 'green';
  }
  return(
    <div className="ball" style={{background}}>{number}</div>
  );
});


export default Ball;