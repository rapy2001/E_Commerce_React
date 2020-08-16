import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import Review from "./Review";


class GadgetFull extends React.Component
{
    constructor(props)
    {
        super(props)
        {
            this.state = {
                data:{},
                svrErr:false,
                ld:true,
                dltScs:false,
                dltErr:false,
                crtScs:false,
                crtErr:false
            }
        }
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
    }
    add()
    {
        let linkVal = "http://localhost:5000/api/user/" + this.props.crntUser.userId +"/cart/add";
        Axios.post(linkVal,{itemId:this.state.data.gadget._id})
        .then((res)=>{
            this.setState({
                svrErr:false,
                ld:false,
                dltScs:false,
                dltErr:false,
                crtScs:true,
                crtErr:false
            })
        })
        .catch((err)=>{
            this.setState({
                svrErr:false,
                ld:false,
                dltScs:false,
                dltErr:false,
                crtScs:false,
                crtErr:true
            })
        })
    }
    delete(id)
    {
        let dltLink = "http://localhost:5000/api/gadget/" + this.state.data.gadget._id + "/review/" + id + "/delete";
        Axios.get(dltLink)
        .then((res)=>{
            for(let i = 0; i<this.state.data.reviews.length; i++)
            {
                if(String(this.state.data.reviews[i]._id) === String(id))
                {
                    let reviews = this.state.data.reviews;
                    reviews.splice(i,1);
                    this.setState({
                        data:{
                            gadget:this.state.data.gadget,
                            reviews:reviews
                        },
                        dltScs:true,
                        dltErr:false
                    });
                    break;
                }
            }
        })
        .catch((err)=>{
            this.setState({
                dltScs:false,
                dltErr:true
            })
        })
        
    }
    componentDidMount()
    {
        console.log("working");
        let linkVal = "http://localhost:5000/api/gadget/" + this.props.match.params.id + "/show";
        Axios.get(linkVal)
        .then((res)=>{
            console.log(res.data);
            this.setState({
                data:{
                    gadget:res.data.gadget,
                    reviews:res.data.reviews
                },
                svrErr:false,
                ld:false
            })
        })
        .catch((err)=>{
            this.setState({
                data:{},
                svrErr:true,
                ld:false
            })
        })
    }
    render()
    {
        // console.log(this.state.data.reviews);
        if(this.state.svrErr === false)
        {
            if(this.state.ld !== true)
            {
                let linkVal = "";
                if(this.props.isLoggedIn && this.state.data !== {})
                {
                    linkVal = "/api/gadget/" + this.state.data.gadget._id + "/review/add";
                }
                let reviews = [];
                if(this.state.data.reviews.length > 0)
                {
                    for(let i = 0; i<this.state.data.reviews.length; i++)
                    {
                        reviews.push(<Review review = {this.state.data.reviews[i]} crntUser = {this.props.crntUser} key = {i} delete ={this.delete}/>);
                    }
                }
                let updLink = "/api/gadget/" + this.state.data.gadget._id +"/update";
                // console.log(this.props);
                return(
                    <div>
                        <div>
                            <img src = {this.state.data.gadget.imageUrl} alt = "error"/>
                        </div>
                        <div>
                            {this.state.crtScs ? <h4>Added to cart successfully</h4> : null}
                            {this.state.crtErr ? <h4>Could not add to  cart Please try again.</h4> : null}
                            {this.props.isLoggedIn ? (this.props.crntUser.username === "Admin" ? <Link to ={updLink}>Update Details</Link>: null) :null}
                            <h1> {this.state.data.gadget.gadgetName} </h1>
                            <h3> $ {this.state.data.gadget.price} </h3>
                            {this.state.data.gadget.amount > 0 ? <h4> In Stock </h4> : <h4 >Out of Stock </h4>}
                            {this.state.data.gadget.amount  > 0 ? this.props.isLoggedIn ? <button onClick ={this.add}> Add to Cart </button> : <h4> Please Log In to order. </h4> : <h4> Out of Stock </h4>}
                            {this.props.isLoggedIn ? <Link to = {linkVal}> Add a Review </Link> : null}
                            <h3>Reviews</h3>
                            {this.state.dltScs ? <h4>Review deleted.</h4> : null}
                            {this.state.dltErr ? <h4>Could not delete review. Please try again.</h4> : null}
                            <div>
                                {reviews.length > 0 ? reviews : <h4>No Reviews yet...</h4>}
                            </div>
                        </div>
                    </div>
                )
            }
            else
            {
                return(
                    <div>
                        <h4>Loading...</h4>
                    </div>
                )   
            }
        }
        else
        {
            return(
                <div>
                    <h4>Internal Server Error. Please try again .</h4>
                </div>
            )
        }
    }
}
export default GadgetFull;