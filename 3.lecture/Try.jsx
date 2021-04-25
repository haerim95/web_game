import React, { Component } from 'react';

class Try extends Component {
    render(){
        return(
        
            //<li key={value.fruit}>
            <li >
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>컨텐츠1 ㅎㅎ</div>
                <div>컨텐츠2 hot loader </div>
                <div>컨텐츠3</div>
            </li>
        )
       
    }
}

export default Try;