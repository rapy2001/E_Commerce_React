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
                <div>
                    <h3>rating: {this.state.review.rating}</h3>
                    <h3>text: {this.state.review.reviewText}</h3>
                    {this.state.review.userDetails.username === this.props.crntUser.username ? <div>
                        <Link to = {updLink}>Update</Link>
                        <button onClick = {()=>{this.props.delete(this.state.review._id)}}>Delete</button>
                    </div> : null}
                    {this.state.dltErr ? <h4>Could not delete review.Please try again.</h4> : null}
                </div>
            )
    }
}
export default Review;