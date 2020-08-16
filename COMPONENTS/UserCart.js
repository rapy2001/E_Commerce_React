import React from "react";
import Axios from "axios";
import CartItem from "./CartItem";
class UserCart extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            userDetails:{},
            cart:[],
            total:0,
            svrErr:false,
            ovrFlw:false,
            scs:false,
            err:false,
            pay:false,
            payErr:false
        }
        this.upd = this.upd.bind(this);
        this.pay = this.pay.bind(this);
    }
    pay()
    {
        let linkVal = "http://localhost:5000/api/user/" + this.state.userDetails.userId +"/cartHandle/payBill";
        console.log("i am here");
        Axios.post(linkVal,{cart:this.state.cart})
        .then((res)=>{
            console.log("hello");
            this.setState({
                pay:true,
                cart:[]
            })
        })
        .catch(()=>{
            this.setState({
                payErr:true
            })
        })
        // Axios.post(linkVal)
        // .then((res)=>{
        //     console.log(res.data);
        // })
    }
    upd(val,id)
    {
        // console.log(val);
        let total = 0;
        let linkVal = "http://localhost:5000/api/user/" + this.props.match.params.id +"/cart/" + id;
        if(val === 1)
        {
            Axios.post(linkVal,{flg:1})
            .then((res)=>{
                if(res.data.flag === 0)
                {
                    
                    this.setState({
                        svrErr:false,
                        ovrFlw:true,
                        scs:false,
                        err:true
                    })
                }
                else
                {
                    let cart = this.state.cart;
                    for(let i=0; i<cart.length;i++)
                    {
                        if(cart[i].id === id)
                        {
                            cart[i].amount+=1;
                            for(let j = 0;j<this.state.cart.length;j++)
                            {
                                total += this.state.cart[j].price * this.state.cart[j].amount;
                            }
                            this.setState({
                                cart:cart,
                                total:total
                            },()=>{
                                this.setState({
                                    svrErr:false,
                                    ovrFlw:false,
                                    scs:true,
                                    err:true
                                })
                            })
                            break;
                        }
                    }
                }
            })
            .catch((err)=>{
                this.setState({
                    svrErr:false,
                    ovrFlw:false,
                    scs:false,
                    err:true
                })
            })
        }
        else
        {
            Axios.post(linkVal,{flg:0})
            .then((res)=>{
                if(res.data.flag === 0)
                {
                    let cart = this.state.cart;
                    for(let i=0; i<cart.length;i++)
                    {
                        if(cart[i].id === id)
                        {
                            cart.splice(i,1);
                            for(let j = 0;j<this.state.cart.length;j++)
                            {
                                total += this.state.cart[j].price * this.state.cart[j].amount;
                            }
                            this.setState({
                                cart:cart,
                                total:total
                            },()=>{
                                this.setState({
                                    svrErr:false,
                                    ovrFlw:false,
                                    scs:true,
                                    err:true
                                })
                            })
                            break;
                        }
                    }
                }
                else
                {
                    let cart = this.state.cart;
                    for(let i=0; i<cart.length;i++)
                    {
                        if(cart[i].id === id)
                        {
                            cart[i].amount-=1;
                            for(let j = 0;j<this.state.cart.length;j++)
                            {
                                total += this.state.cart[j].price * this.state.cart[j].amount;
                            }
                            this.setState({
                                cart:cart,
                                total:total
                            },()=>{
                                this.setState({
                                    svrErr:false,
                                    ovrFlw:false,
                                    scs:true,
                                    err:true
                                })
                            })
                            break;
                        }
                    }
                }
            })
            .catch((err)=>{
                this.setState({
                    svrErr:false,
                    ovrFlw:false,
                    scs:false,
                    err:true
                })
            })
        }
    }
    componentDidMount()
    {
        let linkVal = "http://localhost:5000/api/user/" + this.props.match.params.id +"/cart";
        Axios.get(linkVal)
        .then((res)=>{
            this.setState({
                userDetails:res.data.userDetails,
                cart:res.data.cart,
                svrErr:false,
                ovrFlw:false,
                scs:false,
                err:false
            },()=>{
                let total = 0;
                for(let j = 0;j<this.state.cart.length;j++)
                {
                    total += this.state.cart[j].price * this.state.cart[j].amount;
                } 
                this.setState({
                    total:total
                })          
            })
        })
        .catch((err)=>{
            this.setState({
                svrErr:true,
                ovrFlw:false,
                scs:false,
                err:false
            })
        })
    }
    render()
    {
        console.log(this.state);
        if(this.state.svrErr === false)
        {
            if(this.props.isLoggedIn)
            {
                if(true)
                {
                    if(this.props.crntUser.username === this.state.userDetails.username)
                    {
                        let cart = [];
                        for(let i=0; i<this.state.cart.length;i++)
                        {
                            cart.push(
                                <CartItem key ={i} item ={this.state.cart[i]} upd ={this.upd}/>
                            )
                        }
                        return(
                            <div>
                                <div> 
                                    {this.state.pay ? <h4>Bill Paid successfully.</h4> : null} 
                                    {this.state.payErr ? <h4>Bill could not be paid successfully. Please try again.</h4> : null}
                                </div>
                                <div>
                                    <h2>{this.state.userDetails.username}</h2>
                                </div>
                                <div>
                                    {cart.length > 0 
                                        ? 
                                        <div>
                                        {cart} {this.state.total} <button onClick ={()=>{this.pay()}}>Pay Bill</button></div> 
                                        : 
                                        <h3>Cart is Empty</h3>
                                    }
                                </div>
                            </div>
                        )
                    }
                    else
                    {
                        return(
                            <div>
                                <h4>You don't have the permission to do that.</h4>
                            </div>
                        )
                    }
                }
                else
                {
                    return(
                        <div>
                            <h4>Could not get data from the server.</h4>
                        </div>
                    )
                }
            }
            else
            {
                return(
                    <div>
                        <h4>Please log In to view your cart.</h4>
                    </div>
                )
            }
        }
        else
        {
            return(
                <div>
                    <h4>Could not get data from the server.</h4>
                </div>
            )
        }
    }
            
} 
export default UserCart;