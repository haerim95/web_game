import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers(){
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i +1);
  const shuffle = [];
  while (candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p -c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(()=> getWinNumbers(), []); //두번째 배열의 요소가 바뀌지 않는 한 재실행 되지 않는다.
  const [winBalls, setWinBalls] = useState([]);
  const [winNumbers , setWinNUmbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(()=>{
    console.log('useEffect');
    for(let i = 0; i < winNumbers.length - 1; i++){ //-1 한 이유는 보너스 공때문에
      timeouts.current[i] = setTimeout(()=> {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000 );
    }
    timeouts.current[6] = setTimeout(()=>{
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return() => {
      timeouts.current.forEach((v)=> {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); //빈 배열이면 componentDidMount와 동일
  //배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행한다.
  //배열의 조건이 맞으면 componentDidUpdate가 수행된다.

  const onClickRedo = useCallback(() => { //usecallback은 함수 자체를 기억
    //useCallback을 꼭 사용해야하는 경우 : 부모 컴퍼넌트에서 props로 자식컴퍼넌트로 넘겨줄때...
    //그래야 쓸데없이 리렌더링 되지 않는다.
    console.log(winNumbers);
    setWinNUmbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); //useCallback에선 바뀌는 state를 인자로 넣어주어야한다.

  return(
    <>
    <div>당첨 숫자 : </div>
    <div id="결과창">
      {winBalls.map((v) => <Ball key={v} number={v} />)} 
      {/* Ball component 따로 불러옴 */}
    </div>
    <div>보너스!</div>
    {bonus && <Ball number={bonus} onClick={onClickRedo} />}
    {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
};



export default Lotto;