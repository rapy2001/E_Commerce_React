import React from "react";
import Axios from "axios";

class ReviewForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            reviewText:"",
            rating:0,
            scs:false,
            err:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.rdr = this.rdr.bind(this);
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
        let linkVal = "http://localhost:5000/api/gadget/" + this.props.match.params.id +"/review/add";
        let review  = {
            reviewText:this.state.reviewText,
            rating:this.state.rating,
        }
        let bdy = {
            review:review,
            crntUser:this.props.crntUser
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
        return(
            <div className = " register review_form">
                <div className = "register_box_2">
                    {this.state.scs ? <h4> Review added successfully. You will be redirected shortly </h4> : null}
                    {this.state.err ? <h4> Review could not be added. Please try again </h4> : null}
                    
                    <form onSubmit = {this.handleSubmit} className = "form">
                        <h3>Add  Review</h3>
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
                <div className = "register_box_1 review_form_box_1">
                    <h1>Gadget Point</h1>
                </div>
            </div>
        )
    }
}
export default ReviewForm;