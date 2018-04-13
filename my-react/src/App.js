// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import {createStore} from 'redux'
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;


import React from 'react'

class App extends React.Component{
  render(){
    const boss = '李云龙'
    return (
      <div>
        <h2>独立团，团长{boss}</h2>
        <First leader="小一"></First>
        <Second leader="小二"></Second>
      </div>
    )
  }
}

function Second(props){
 return <h2>二营营长{props.leader}</h2>
}


class First extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      solders:['兵1','兵2','兵3']
    }
    // this.addSolder = this.addSolder.bind(this)
  }
  componentWillMount(){
    console.log('马上就要加载啦');
  }
  componentDidMount(){
    console.log('加载完毕');
  }
  addSolder(){
    this.setState({
      solders:[...this.state.solders,'兵'+(this.state.solders.length+1)]
    })
  }
  render(){
    console.log('正在加载')
    return (
      <div>
        <h2>一营营长{this.props.leader}</h2>
        <button onClick={()=>this.addSolder()}>新兵入伍</button>
        <ul>
          {this.state.solders.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
      </div>
    ) 
  }
}


export default App