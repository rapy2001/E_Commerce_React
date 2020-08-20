import React from "react";
import Axios from "axios";


class GadgetUpdate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            gadgetName:"",
            imageUrl:"",
            description:"",
            amount:0,
            price:0,
            scs:false,
            err:false,
            svrErr:false,
            nameErr:false,
            logErr:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.rdr = this.rdr.bind(this);
    }
    rdr()
    {
        this.props.history.push("/");
    }
    componentDidMount()
    {
        let linkVal = "http://localhost:5000/api/gadget/" + this.props.match.params.id +"/get";
        Axios.get(linkVal)
        .then((res)=>{
            this.setState({
                gadgetName:res.data.gadgetName,
                imageUrl:res.data.imageUrl,
                description:res.data.description,
                amount:res.data.amount,
                price:res.data.price,
                scs:false,
                err:false,
                svrErr:false,
                nameErr:false,
                logErr:false,
                
            })
        })
        .catch((err)=>{
            this.setState({
                scs:false,
                err:false,
                svrErr:true,
                nameErr:false,
                logErr:false
            })
        })
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
        let linkVal = "http://localhost:5000/api/gadget/" + this.props.match.params.id +"/update";
        let gadget = {
            gadgetName:this.state.gadgetName,
            imageUrl:this.state.imageUrl,
            description:this.state.description,
            price:this.state.price,
            amount:this.state.amount
        }
        Axios.post(linkVal,{crntUser:this.props.crntUser, gadget:gadget, isLoggedIn:this.props.isLoggedIn})
        .then((res)=>{
            if(res.data.flag === 1)
            {
                // console.log(this.state);
                this.setState({
                    gadgetName:"",
                    imageUrl:"",
                    description:"",
                    price:0,
                    scs:true,
                    err:false,
                    svrErr:false,
                    nameErr:false,
                    logErr:false
                    
                },()=>{
                    setTimeout(this.rdr,1500);
                })
            }
            else if(res.data.flag === 0)
            {
                this.setState({
                    gadgetName:"",
                    imageUrl:"",
                    description:"",
                    price:0,
                    scs:false,
                    err:false,
                    svrErr:false,
                    nameErr:true,
                    logErr:false
                })
            }
            else if(res.data.flag === -1)
            {
                this.setState({
                    gadgetName:"",
                    imageUrl:"",
                    description:"",
                    price:0,
                    scs:false,
                    err:false,
                    svrErr:false,
                    nameErr:false,
                    logErr:true
                })
            }
        })
        .catch((err)=>{
            this.setState({
                gadgetName:"",
                imageUrl:"",
                description:"",
                price:0,
                scs:false,
                err:true,
                nameErr:false,
                logErr:false
            })
        })
    }
    render()
    {
        if(this.state.svrErr === false)
        {
            if(this.props.isLoggedIn)
            {
                if(this.props.crntUser.username ===  "Admin")
                {
                    return(
                        <div className = "gadgetUpdate">
                            
                            <form onSubmit = {this.handleSubmit} className = "form">
                                {this.state.scs ? <h4 className = "success">Gadget data updated successfully. You will be redirected shortly</h4> : null}
                                {this.state.err ? <h4 className = "failure">Gadget data could not be updated. Please try again.</h4> : null}
                                <h3>Update Gadget Details</h3>
                                <input 
                                    type="text" 
                                    placeholder="Gadget Name" 
                                    name="gadgetName" 
                                    value = {this.state.gadgetName}
                                    onChange = {this.handleChange} 
                                    autoComplete = "off" 
                                    
                                />
                                <input 
                                    type="text" 
                                    placeholder="Image Url" 
                                    name="imageUrl" 
                                    onChange = {this.handleChange} 
                                    autoComplete = "off" 
                                    value = {this.state.imageUrl}
                                />
                                <textarea 
                                    name = "description" 
                                    placeholder = "Gadget Description" 
                                    onChange = {this.handleChange}
                                    value = {this.state.description}
                                >
                                </textarea>
                                <input 
                                    type="number" 
                                    placeholder="Gadget Price" 
                                    name="price" 
                                    onChange = {this.handleChange} 
                                    step = "0.5"
                                    min = "0"
                                    value = {this.state.price}
                                />
                                <input 
                                    type="number" 
                                    placeholder="Gadget Stock" 
                                    name="amount" 
                                    onChange = {this.handleChange} 
                                    step = "0.5"
                                    min = "0"
                                    value = {this.state.amount}
                                />
                                <button type = "submit">Submit</button>
                            </form>
                        </div>
                    )
                }
                else
                {
                    return(
                        <div>
                            <h4>You need to be logged in as the Admin to update the Gadget Details.</h4>
                        </div>
                    )
                }
            }
            else
            {
                return(
                    <div>
                        <h4>You need to be logged in as the Admin to update the Gadget Details.</h4>
                    </div>
                )
            }   
        }
        else
        {
            return(
                <div>
                    <h4>Internal Server Error. Please try again.</h4>
                </div>
            )
        }
    }
}
export default GadgetUpdate;