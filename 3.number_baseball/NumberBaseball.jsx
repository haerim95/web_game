
import React, { Component } from 'react';

function getNumbers(){// 쑷자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}


class NumberBaseball extends Component{
    state = {
        result :'',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = () => {

    };

    onChangeInput = () => {

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
                {[
                    { fruit: '사과', color: '빨갛다!'}, 
                    { fruit: '바나나', color: '노랗다'}, 
                    { fruit: '포도', color: '푸르다'}, 
                    { fruit: '복숭아', color: '핑크빛'}
                ].map((e, i)=>{
                    return(
                        //key: 고유한 값, key를 입력하지 않으면 key 에러가 뜬다. 
                        // key값이 겹치거나 고유하지 않으면 또 에러가 뜬다. 
                        //key에 index 값 입력하는건 지양하자...성능 최적화에 좋지 않음.
                        <li key={e.fruit}><b>{e.fruit}</b> - {e.color} - {i}</li>
                    );
                })}
            </ul>
          </>
      );
  } 
}

//export const hello = 'hello'; //import { hello }, 변수명만 안 겹치면 여러개 사용 가능
export default NumberBaseball; //import NumberBaseball , 한번만 쓸 수 있음