import React, {useState, useRef} from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]); //useState는 render 실행. 화묜애 영향을 줌
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef(); //useRef 는 변경되어도 화면에 영향이 미치진 않는다.

  const onClickScreen = () => {
    if( state === 'waiting' ){
      timeOut.current = setTimeout(()=>{
        setState('now');
        setMessage('지금 클릭');
      
       startTime.current = new Date();
      }, Math.floor(Math.random()*1000) + 2000); //2~3초 랜덤
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    }else if(state === 'ready'){ // 성급하게 클릭
      clearTimeout(timeOut.current); // time 아웃 없애기
      setState('waiting');
      setMessage('너무 성급하시군요, 녹색이 된 후에 클릭하세요.');
    }else if (state === 'now'){ //반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요!');
      setResult( (prevResult) => {
        return [...prevResult, endTime.current - startTime.current]; //push 해줄땐 prev 쓴다
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return  result.length === 0  //if문 대신 삼항연산자
      ? null  //jsx에선 null이 태그가 아예 없는걸로 이해한다.
      : <>
          <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length }ms</div>
          <button onClick={onReset}>리셋</button>
        </>
  };

    return(
      <>
        <div
          id="screen"
          className={state}
          onClick={onClickScreen}
          >
            {message}
        </div>
        {/* inline 으로 if 문 사용하는 법 같은 방법으로 for문도 사용할 수 있다. 꼭 즉시실행 함수로 만들어줘야한다*/}
        {/* 이렇게 쓰는건 지양하자. 최고 좋은 방법은 자식 컴포넌트로 만들어 주는 것. 두번째는 함수로 빼는 것 */}
        {/* {(() => {
          if (result.length === 0){
            return null;
          }else{
            return <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length }ms</div>
                <button onClick={onReset}>리셋</button>
              </>
          }
        })()} */}
        {renderAverage()}
      </>
    )
 
}



export default ResponseCheck;