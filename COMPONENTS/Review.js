import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";


class Review extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            review:this.props.review,
        }
        
    }
    
    render()
    {
        let updLink = "/api/review/" + this.state.review._id + "/update";
            return(
                <div className = "review">
                    <h3>{this.state.review.rating}</h3>
                    <p> {this.state.review.reviewText}</p>
                    <h5>by <i>{this.state.review.userDetails.username}</i></h5>
                    {this.state.review.userDetails.username === this.props.crntUser.username ? <div>
                        <Link to = {updLink} className = "review_upd">Update</Link>
                        <button onClick = {()=>{this.props.delete(this.state.review._id)}} className = "review_dlt">Delete</button>
                    </div> : null}
                    {this.state.dltErr ? <h4>Could not delete review.Please try again.</h4> : null}
                </div>
            )
    }
}
export default Review;