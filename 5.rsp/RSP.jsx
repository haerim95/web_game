import react, {Component} from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDIdMount 
// -> (setState/props 바뀔때 -> shouldComponentUpdate(얘는 true 일때 실행된다) -> render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentUnMount -> 소멸

class RSP extends Component {
    state ={
        result : '',
        imgCoord: 0,
        score: 0,
    };

    componentDidMount(){ //render가 처음으로 실행됐을때 실행 됨, setState 같은걸로 렌더가 바뀔때는 실행되지 않는다.
      
    }

    componentDidUpdate(){ //리렌더링 후에 실행된다.

    }

    componentWillUnmount(){ //component가 제거되기 직전, 부모에 의해 자식(나) 컴포넌트를 없앴을 때

    }

    render(){
        const { result, score, imgCoord } = this.state;
        return(
            <>
              <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div> 
              <div>
                <button id="rock" className="btn" onClick={()=>onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={()=>onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={()=>onClickBtn('보')}>보</button>
              </div>
              <div>{result}</div>
              <div>현재 {score} 점</div>
            </>
        ); 
    }
}

export default RSP;