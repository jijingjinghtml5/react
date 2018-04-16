import React from 'react'
import { Route,Link} from 'react-router-dom'
import App from './App'


function Second(){
	return <h2>2222222</h2>
}
function Third(){
	return <h2>3333333</h2>
}
class Dashboard extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				<ul>
					<li>
						<Link to="/dashboard">11</Link>
					</li>
					<li>
						<Link to="/dashboard/Second">22</Link>
					</li>
					<li>
						<Link to="/dashboard/Third">33</Link>
					</li>
				</ul>
				<Route path='/dashboard' exact component={App}></Route>
				<Route path='/dashboard/Second' component={Second}></Route>
				<Route path='/dashboard/Third' component={Third}></Route>
			</div>
		)
	}
}

export default Dashboard