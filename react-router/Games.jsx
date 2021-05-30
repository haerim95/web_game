import React from 'react';
// hashrouter 는 #가 붙어서 해시 라우터 이다. 해시라우터는 새로고침해도 나오고 브라우저 라우터는 새로고침하면 에러가 뜬다.
// 그 이유는 프론트엔드에선 경로가 있지만, 서버는 이 경로가 저장되어 있지 않아서 못찾기 때문이다.
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter> 
      <div>
        {/* Link는 a태그를 대신한다. Route를 불러와 주는 것이다. */}
        <Link to="/game/number-baseball">숫자야구</Link> 
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link> 
        &nbsp;
        <Link to="/game/lotto-geerator">로또생성기</Link> 
        &nbsp;
        <Link to="/game/index">게임매처</Link>
      </div>
      <div>
        <Route path="/game/:name" component={GameMatcher} />
      </div>
    </BrowserRouter>
  );
};

export default Games;
