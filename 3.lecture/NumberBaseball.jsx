
import React, { Component } from 'react';
import Try from './Try'; //프로젝트가 커지면 길어지기 때문에 컴퍼넌트를 나눠서 관리하면 코드관리가 깔끔해진다.

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
        {/* 화살표 함수를 쓰는 이유 : this를 사용하지 못한다. 그냥 함수불러오려면 constructor 사용해야함 */}
    };

    onChangeInput = () => {

    };
    
    fruits = [
        { fruit: '사과', color: '빨갛다!'}, 
        { fruit: '바나나', color: '노랗다'}, 
        { fruit: '포도', color: '푸르다'}, 
        { fruit: '복숭아', color: '핑크빛'}
    ];

  render(){
      return(
          <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
            </form>
            <div>시도 : {this.state.tries.length}</div>
            <ul>
                {this.fruits.map((e, i)=>{ //컴퍼넌트엔 인자가 전달되지 않는다
                    return(
                             //key: 고유한 값, key를 입력하지 않으면 key 에러가 뜬다. 
                            // key값이 겹치거나 고유하지 않으면 또 에러가 뜬다. 
                            //key에 index 값 입력하는건 지양하자...성능 최적화에 좋지 않음.
                        <Try key={e.fruit + e.color } value={e} index={i} /> //반복문에는 성능문제가 자주 발생한다
                        // 인자가 전달되지 않기 때문에 연결고리를 만들어주는데 이게 바로 props이다.
                        // 이름은 아무거나 써도 된다. chicken={e}로 써도됨 그대신 해당 컴퍼넌트에 정해준 이름으로 불러오기
                    );
                })}
            </ul>
          </>
      );
  } 
}

//export const hello = 'hello'; //import { hello }, 변수명만 안 겹치면 여러개 사용 가능
export default NumberBaseball; //import NumberBaseball , 한번만 쓸 수 있음