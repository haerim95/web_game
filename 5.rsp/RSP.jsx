import React, {Component} from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDIdMount 
// -> (setState/props 바뀔때 -> shouldComponentUpdate(얘는 true 일때 실행된다) -> render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentUnMount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
}

class RSP extends Component {
    state ={
        result : '',
        imgCoord: '0',
        score: 0,
    };

    interval;

    componentDidMount(){ //render가 처음으로 실행됐을때 실행 됨, setState 같은걸로 렌더가 바뀔때는 실행되지 않는다.
    // 비동기 요청을 많이 한다. 
    this.interval = setInterval(() => {
    const {imgCoord} = this.state; //-142px
      
      if(imgCoord === rspCoords.바위){
        this.setState({
          imgCoord: rspCoords.가위,
        });
      }else if(imgCoord === rspCoords.가위){
        this.setState({
          imgCoord: rspCoords.보,
        });
      }else if(imgCoord === rspCoords.보){
        this.setState({
          imgCoord: rspCoords.바위,
        });
      }
    }, 1000);
      
    }

    componentDidUpdate(){ //리렌더링 후에 실행된다.

    }

    componentWillUnmount(){ //component가 제거되기 직전, 부모에 의해 자식(나) 컴포넌트를 없앴을 때
      //비동기 요청 정리를 많이 한다.
      clearInterval(this.interval);
    }

    onClickBtn = (choice) =>{

    };

    render(){
        const { result, score, imgCoord } = this.state;
        return(
            <>
              <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div> 
              <div>
                <button id="rock" className="btn" onClick={()=> this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={()=>this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={()=>this.onClickBtn('보')}>보</button>
              </div>
              <div>{result}</div>
              <div>현재 {score} 점</div>
            </>
        ); 
    }
}

export default RSP;