
import React, { Component } from 'react';
import Try from './Try'; //프로젝트가 커지면 길어지기 때문에 컴퍼넌트를 나눠서 관리하면 코드관리가 깔끔해진다.


function getNumbers(){ //숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for(let i =0; i < 4; i += 1){
        const chosen = candidate.splice(Math.floor(Math.random() * ( 9 -i )), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component{
    state = {
        result :'',
        value: '',
        answer: getNumbers(), // ex[1,3,5,7]
        tries: [], //push 쓰면 안돼!
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        {/* 화살표 함수를 쓰는 이유 : this를 사용하지 못한다. 그냥 함수불러오려면 constructor 사용해야함 */}
        if(this.state.value === this.state.answer.join('')){ 
            this.setState((prevState) => { //옜날 state를 비교하는거라면 함수형 setState 써야한다. 그래야 setState 연달아 써도 문제가 발생 안함
                return{
                    result : '홈런!',
                    tries: [...prevState.tries, { try: this.state.value, result: '홈런!' }]
                }
            });
            alert('게임을 다시 시작합니다.')
                this.setState({ //게임 리셋
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
        }else{
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){ //10번 이상 츨렸을때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 였습니다! `
                });
                alert('게임을 다시 시작합니다.')
                this.setState({ //게임 리셋
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            }else{ //10번 이하로 틀렸을 때
                for(let i = 0; i < 4; i += 1){ //스트라이크 / 볼 판정 알고리즘
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    }else if(this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState( (prevState) => {
                    //배열에서 ...을 입력하는 이유: 리액트에선 state가 변했는지 판단하고 render가 되기 때문에
                    // ...으로 기존 배열을 저장을 해준 뒤에 변경사항을 비교를 해주어야 한다.
                    return{
                        tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼입니다.` }],
                        value: '',
                    }
                    
                });
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };
    
  render(){
      return(
          <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
            </form>
            <div>시도 : {this.state.tries.length}</div>
            <ul>
                {this.state.tries.map((v, i)=>{ //컴퍼넌트엔 인자가 전달되지 않는다
                    return(
                             //key: 고유한 값, key를 입력하지 않으면 key 에러가 뜬다. 
                            // key값이 겹치거나 고유하지 않으면 또 에러가 뜬다. 
                            //key에 index 값 입력하는건 지양하자...성능 최적화에 좋지 않음.
                        <Try key={`${i+1} 차 시도 :`} tryInfo={v} /> //반복문에는 성능문제가 자주 발생한다
                        // 인자가 전달되지 않기 때문에 연결고리를 만들어주는데 이게 바로 props이다.
                        // 이름은 아무거나 써도 된다. chicken={v}로 써도됨 그대신 해당 컴퍼넌트에 정해준 이름으로 불러오기
                    );
                })}
            </ul>
          </>
      );
  } 
}

//export const hello = 'hello'; //import { hello }, 변수명만 안 겹치면 여러개 사용 가능
export default NumberBaseball; //import NumberBaseball , 한번만 쓸 수 있음