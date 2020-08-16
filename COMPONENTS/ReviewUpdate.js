import React from "react";
import Axios from "axios";

class ReviewUpdate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data:{},
            reviewText:"",
            rating:0,
            scs:false,
            err:false,
            svrErr:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.rdr = this.rdr.bind(this);
    }
    componentDidMount()
    {
        let linkVal = "http://localhost:5000/api/review/" + this.props.match.params.id + "/get";
        Axios.get(linkVal)
        .then((res)=>{
            this.setState({
                data:res.data.review,
                reviewText:res.data.review.reviewText,
                rating:res.data.review.rating,
            })
        })
        .catch((err)=>{
            this.setState({
                svrErr:true
            })
        })
    }
    rdr()
    {
        this.props.history.push("/");
    }
    handleChange(e)
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit(e)
    {
        e.preventDefault();
        // alert("working");
        let linkVal = "http://localhost:5000/api/review/" + this.props.match.params.id + "/update";
        let review  = {
            reviewText:this.state.reviewText,
            rating:this.state.rating,
        }
        let bdy = {
            review:review
        }
        Axios.post(linkVal,bdy)
        .then((res)=>{
            this.setState({
                reviewText:"",
                rating:0,
                scs:true,
                err:false
            },()=>{
                setTimeout(this.rdr,1500);
            })
        })
        .catch((err)=>{
            this.setState({
                reviewText:"",
                rating:0,
                scs:false,
                err:true
            })
        })
    }
    render()
    {
        console.log(this.state.data)
        if(this.state.svrErr === false)
        {
            if(this.state.data)
            {
                if(this.props.isLoggedIn)
                {
                    if(this.props.crntUser.username === this.data.userDetails.username)
                    {
                        return(
                            <div>
                                <div>
                
                                </div>
                                <div>
                                    {this.state.scs ? <h4> Review updated successfully. You will be redirected shortly </h4> : null}
                                    {this.state.err ? <h4> Review could not be updated. Please try again </h4> : null}
                                    <form onSubmit = {this.handleSubmit}>
                                        <h3>Update review</h3>
                                        <input 
                                            type = "text" 
                                            placeholder = "Your Review" 
                                            name = "reviewText" 
                                            value = {this.state.reviewText} 
                                            onChange = {this.handleChange} 
                                            autoComplete = "off" 
                                        />
                                        <input 
                                            type = "number" 
                                            placeholder = "Your Rating" 
                                            name = "rating" 
                                            value = {this.state.rating} 
                                            onChange = {this.handleChange} 
                                        min = "0"
                                        step = "1"
                                        />
                                        <button type = "submit">Add Review</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                    else
                    {
                        return(
                            <div>
                                <h4>You dont't have the permission to do that.</h4>
                            </div>
                        )
                    }
                }
                else
                {
                    return(
                        <div>
                            <h4>You dont't have the permission to do that.</h4>
                        </div>
                    )
                }
                
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
export default ReviewUpdate;