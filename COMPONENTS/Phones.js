import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

class Phones extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            gadgets:[],
            svrErr:false
        }
    }
    componentDidMount()
    {
        let linkVal = "http://localhost:5000/api/gadgets/phones/all";;
        Axios.get(linkVal)
        .then((res)=>{
            this.setState({
                gadgets:res.data.gadgets
            })
        })
        .catch((err)=>{
            this.setState({
                gadgets:[],
                svrErr:true
            })
        })
    }
    render()
    {
        let items=[];
        if(this.state.gadgets.length > 0)
        {
            this.state.gadgets.forEach((gadget,ind)=>{
                let linkVal = "/api/gadget/" + gadget._id + "/show";
                items.push(
                <div key = {ind}>
                    <img src = {gadget.imageUrl} alt="error"/>
                    <h3>Name: {gadget.gadgetName}</h3>
                    <h3>Price: $ {gadget.price}</h3>
                    <Link to = {linkVal}>Learn More</Link>
                </div>
                )
            })
        }
        if(this.state.svrErr === false)
        {
            if(items.length === 0)
            {
                return(<div>
                    <h3>Loading ...</h3>
                </div>)
            }
            else
            {
                return(
                    <div>
                        {items}
                    </div>
                )
            }
        }
        else
        {
            return(
                <div>
                    <h3>Internal Server Error.</h3>
                </div>
            )
        }
    }
}
export default Phones;