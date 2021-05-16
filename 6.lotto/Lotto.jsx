import React, {Component} from 'react';
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

class Lotto extends Component{
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들 6개
    winBalls: [],
    bonus: null, // 보너스 공 1개
    redo: false, //재실행

  };

  timeouts = []; //clear

  runTimeouts = () => {
    const {winNumbers} = this.state; //this.state는 구조분해 해주는 것이 보기가 좋다.
    for(let i = 0; i < winNumbers.length - 1; i++){ //-1 한 이유는 보너스 공때문에
      this.timeouts[i] = setTimeout(()=> {
        this.setState((prevState) => {
          return{
            winBalls: [...prevState.winBalls, winNumbers[i]],
          }
        });
      }, (i + 1) * 1000 );
    }
    this.timeouts[6] = setTimeout(()=>{
      this.setState({
        bonus : winNumbers[6],
        redo: true, // 한번더 버튼 보이기
      });
    }, 7000);
  }

  componentDidMount(){
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState){
    // 조건문을 잘 적어주는게 중요하다. 안그럼 state나 props 가 바꼈을때 계속 update가 된다.
    if(this.state.winBalls.length === 0){
      this.runTimeouts();
    }
  }

  componentWillUnmount(){ //clear가 안되었을때 타임아웃
    this.timeouts.forEach((v)=>{
      clearTimeout(v);
    })
  }

  onClickRedo = () => { //초기화
    this.setState({
      winNumbers: getWinNumbers(), 
      winBalls: [],
      bonus: null, 
      redo: false,
    });
    this.timeouts = [];
  }

  render(){
    const {winBalls, bonus, redo} = this.state;
    return(
      <>
        <div>당첨 숫자 : </div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)} 
          {/* Ball component 따로 불러옴 */}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    );
  }

}

export default Lotto;