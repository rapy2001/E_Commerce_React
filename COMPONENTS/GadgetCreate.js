import React from "react";
import Axios from "axios";


class gadgetCreate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            gadgetName:"",
            imageUrl:"",
            Type:1,
            description:"",
            amount:0,
            price:0,
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
        if(e.target.name ==="Type")
            if(e.target.value === "laptops")
            {
                this.setState({
                    Type:1
                })
            }
            else{
                this.setState({
                    Type:2
                })
            }
        else
            this.setState({
                [e.target.name]:e.target.value
            })
    }
    handleSubmit(e)
    {
        e.preventDefault();
        let linkVal = "http://localhost:5000/api/gadgets/create";
        let gadget = {
            gadgetName:this.state.gadgetName,
            imageUrl:this.state.imageUrl,
            Type:this.state.Type,
            description:this.state.description,
            price:this.state.price,
            amount:this.state.amount
        }
        Axios.post(linkVal,{crntUser:this.props.crntUser, gadget:gadget})
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
                    err:false
                },()=>{
                    setTimeout(this.rdr,1500);
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
                err:true
            })
        })
    }
    render()
    {
        return(
            <div className = "gadgetCreate">
                
                <form onSubmit = {this.handleSubmit} className = "form">
                    {this.state.scs ? <h4 className = "success">Gadget added to database successfully. You will be redirected shortly</h4> : null}
                    {this.state.err ? <h4 className = "failure">Gadget could not be added. Please try again.</h4> : null}
                    <h3>Add a New Gadget</h3>
                    <input 
                        type="text" 
                        placeholder="Gadget Name" 
                        name="gadgetName" 
                        onChange = {this.handleChange} 
                        autocomplete = "off" 
                        value ={this.state.gadgetName}
                    />
                    <input 
                        type="text" 
                        placeholder="Image Url" 
                        name="imageUrl" 
                        onChange = {this.handleChange} 
                        autocomplete = "off" 
                        value ={this.state.imageUrl}
                    />
                    <textarea 
                        name = "description" 
                        placeholder = "Gadget Description" 
                        onChange = {this.handleChange}
                        value ={this.state.description}
                    >
                    </textarea>
                    <input 
                        type="number" 
                        placeholder="Gadget Price" 
                        name="price" 
                        onChange = {this.handleChange} 
                        step = "0.5"
                        min = "0"
                        value ={this.state.price}
                    />
                    <input 
                        type="number" 
                        placeholder="Gadget Stock" 
                        name="amount" 
                        onChange = {this.handleChange} 
                        step = "0.5"
                        min = "0"
                        value ={this.state.amount}
                    />
                    <select name="Type" value={this.state.Type===1 ? "phones":"laptops"} onChange={this.handleChange}>
                            <option name="phone">phones</option>
                            <option name="laptops">laptops</option>
                        </select>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default gadgetCreate;