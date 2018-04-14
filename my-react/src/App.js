import React from 'react'
import {connect} from 'react-redux'
import {addGUN,addGunAsync,removeGUN,removeGunAsync} from './index.redux'

// const mapStateProps = (state)=>{
//   return {num:state}
// }
// const actionCreators = {addGUN,addGunAsync,removeGUN,removeGunAsync}
// @connect(mapStateProps,actionCreators)

@connect(
  //你要什么属性放到props
  state=>({
    num:state
  }),
  //你要什么方法放到props，自动dispatch
  {addGUN,addGunAsync,removeGUN,removeGunAsync}
)
class App extends React.Component{
	// constructor(props){
	// 	super(props)
	// }
	render(){
    const num = this.props.num;
    const addGUN = this.props.addGUN;
    const removeGUN = this.props.removeGUN;
    const addGunAsync = this.props.addGunAsync;
    const removeGunAsync = this.props.removeGunAsync;
		return (
      <div>
          <h1>现在有机关枪{num}</h1>
          <button onClick={addGUN}>+</button>
          <button onClick={removeGUN}>-</button>
          <button onClick={addGunAsync}>+..</button>
          <button onClick={removeGunAsync}>-..</button>
      </div>
    ) 
	}
}

// const mapStateProps = (state)=>{
//   return {num:state}
// }
// const actionCreators = {addGUN,addGunAsync,removeGUN,removeGunAsync}
// App = connect(mapStateProps,actionCreators)(App)
export default App