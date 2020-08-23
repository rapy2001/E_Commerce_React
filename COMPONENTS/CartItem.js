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
                <div className = "cartItem">
                    <img src ={this.state.item.imageUrl} alt ="error" />
                    <h4 className = "cartItem_name">{this.state.item.gadgetName}</h4>
                    <h4 className = "cartItem_price"> $ {this.state.item.price}</h4>
                    <div className = "cartItem_btn">
                        <button onClick ={()=>{this.props.upd(1,this.state.item.id)}}>+</button>
                        <h4>{this.state.item.amount}</h4>
                        <button onClick ={()=>{this.props.upd(0,this.state.item.id)}}>-</button>
                    </div>
                </div>         
        )
                          
    }
}
export default CartItem;