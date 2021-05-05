import React, { Component } from 'react';

class ResponseCheck extends Component {

    state = {
      state: 'waiting',
      message: '클릭해서 시작하세요.',
      result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {

      const { state, message, result } = this.state;
      if( state === 'waiting' ){
        this.setState({
          state : 'ready',
          message : '초록색이 되면 클릭하세요.',
        });
        this.timeout = setTimeout(()=>{
          this.setState({
            state: 'now',
            message: '지금 클릭',
          });
         this. startTime = new Date();
        }, Math.floor(Math.random()*1000) + 2000); //2~3초 랜덤
      }else if(state === 'ready'){ // 성급하게 클릭
        clearTimeout(this.timeout); // time 아웃 없애기
        this.setState({
          state : 'waiting',
          message : '너무 성급하시군요, 녹색이 된 후에 클릭하세요.',
        })
      }else if (state === 'now'){ //반응속도 체크
        this.endTime = new Date();
        this.setState((prevState) => {
          return {
            state : 'waiting',
            message: '클릭해서 시작하세요!',
            result : [...prevState.result, this.endTime - this.startTime], //push 해줄땐 prev 쓴다
          }
        });
      }

    };

    onReset = () => {
      this.setState({
        result: [],
      });
    }

    renderAverage = () => {
      const { result } = this.state;
      return  this.state.result.length === 0  //if문 대신 삼항연산자
        ? null  //jsx에선 null이 태그가 아예 없는걸로 이해한다.
        : <>
            <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length }ms</div>
            <button onClick={this.onReset}>리셋</button>
          </>
    }

    render(){ //for와 if 사용을 못함 render 안에선...
      const { state, massage } = this.state;
      return(
        <>
          <div
            id="screen"
            className={this.state.state} 
            onClick={this.onClickScreen}
          >
            { this.state.message }
          </div>
         {this.renderAverage()}
        </>
      )
      
    }
}

export default ResponseCheck;