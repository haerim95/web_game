import React, { Component } from 'react';

class ResponseCheck extends Component {

    state = {
      state: 'waiting',
      message: '클릭해서 시작하세요.',
      result: [],
    };

    onClickScreen = () => {

    }

    renderAverage = () => {
      const { result } = this.state;
      return  this.state.result.length === 0  //if문 대신 삼항연산자
        ? null 
        : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length }ms</div>
    }

    render(){ //for와 if 사용을 못함 render 안에선...
      const { state, massage } = this.state;
      return(
        <>
          <div
            id="screen"
            className={this.state.state} 
            onClick={this.onCickScreen}
          >
            { this.state.message }
          </div>
         {this.renderAverage()}
        </>
      )
      
    }
}

export default ResponseCheck;