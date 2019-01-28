import React,{Component} from 'react'

export class SingleGood extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {...props};
        console.log(this.state.data);
    }
    render(){
        return (
            <ul>
                {
                    this.state.data.map((item, index) => {
                        return <li key={item.product.product_id}>
                            {item.name}
                        </li>
                    })
                }
            </ul>
        )
    }
}
