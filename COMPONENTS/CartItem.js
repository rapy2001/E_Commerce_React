import React from "react";

class CartItem extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            item:this.props.item
        }
    }
    render()
    {
        return(
                <div>
                    <h4>Name:{this.state.item.gadgetName}</h4>
                    <h4>Price:{this.state.item.price}</h4>
                    <img src ={this.state.item.imageUrl} alt ="error" />
                    <h4>Amount:{this.state.item.amount}</h4>
                    <button onClick ={()=>{this.props.upd(1,this.state.item.id)}}>PLUS</button>
                    <button onClick ={()=>{this.props.upd(0,this.state.item.id)}}>MINUS</button>
                </div>         
        )
                          
    }
}
export default CartItem;