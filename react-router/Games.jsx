import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../3.number_baseball/NumberBaseball';
import RSP from '../5.rsp/RSP';
import Lotto from '../6.lotto/Lotto';

const Games = () => {
  return (
    <BrowserRouter> 
      <div>
        {/* Link는 a태그를 대신한다. Route를 불러와 주는 것이다. */}
        <Link to="/number-baseball">숫자야구</Link> 
        &nbsp;
        <Link to="/rock-scissors-paper">가위바위보</Link> 
        &nbsp;
        <Link to="/lotto-geerator">로또생성기</Link> 
      </div>
      <div>
        <Route path="/number-baseball" component={NumberBaseball} />
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-geerator" component={Lotto} />
      </div>
    </BrowserRouter>
  );
};

export default Games;
