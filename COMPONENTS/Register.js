import React from "react";
import Axios from "axios";
import {Link}  from "react-router-dom";
class Register extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:"",
            password:"",
            imageUrl:"",
            nameErr:false,
            scs:false,
            err:false,
            frmName:false,
            frmPwd:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.rdr=this.rdr.bind(this);
        this.redo = this.redo.bind(this);
    }
    redo()
    {
        this.setState({
            nameErr:false,
            scs:false,
            err:false,
            frmName:false,
            frmPwd:false
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
        if(this.state.username.length < 3)
            {
                this.setState({
                    frmName:true,
                    username:"",
                    password:"",
                    imageUrl:"",
                })
            }
            else
            {
                this.setState({
                    frmName:false,
                    username:"",
                    password:"",
                    imageUrl:"",
                })
            }
            if(this.state.password.length  < 5)
            {
                this.setState({
                    frmPwd:true,
                    username:"",
                    password:"",
                    imageUrl:"",
                })
            }
            else
            {
                this.setState({
                    frmPwd:false,
                    username:"",
                    password:"",
                    imageUrl:"",
                })
            }
        if(this.state.username.length > 0 && this.state.password.length >= 5)
        {
            let linkVal="http://localhost:5000/api/user/register";
            let user={
                username:this.state.username,
                password:this.state.password,
                imageUrl:this.state.imageUrl
            }
            Axios.post(linkVal,{
                user:user
            })
            .then((res)=>{
                if(res.data.flag===-1)
                {
                    this.setState({
                        nameErr:true,
                        scs:false,
                        err:false
                    },()=>{
                        setTimeout(this.redo,1000)
                    })
                }
                else if(res.data.flag===0)
                {
                    this.setState({
                        nameErr:false,
                        scs:true,
                        err:false
                    },()=>{
                        setTimeout(this.rdr,1500);
                    })
                }
            })
            .catch(err=>{
                this.setState({
                    nameErr:false,
                    scs:false,
                    err:true
                })
            })
        }
        
    }
    render()
    {
        return(
            <div className ="register">
                <div className = "register_box_1">
                    <h1>Gadget Point</h1>
                </div>
                <div className ="register_box_2">
                    
                    <form onSubmit={this.handleSubmit} className ="form">
                        {this.state.scs ? <h4 className = "success">Registration Successfull</h4>:null}
                        {this.state.err ? <h4 className = "failure">Internal Server Error. Please try again.</h4>:null}
                        {this.state.nameErr ? <h4 className = "failure">Username already exists. Please try again.</h4>:null}
                        <h3>Register</h3>
                        <input 
                            type="text" 
                            name="username"
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            required="required" 
                            placeholder="User Name"
                            autoComplete="off"
                            required = "required"
                        />
                        {this.state.frmName ? <h5 className = "red">The username length should be atleast 3 characters long</h5> : null}
                        <input 
                            type="password" 
                            name="password"
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            required="required" 
                            placeholder="Password"
                            autoComplete="off"
                            required = "required"
                        />
                        {this.state.frmPwd ? <h5 className = "red">The password length should be atleast 5 characters long</h5> : null}
                        <input 
                            type="text" 
                            name="imageUrl"
                            value={this.state.imageUrl} 
                            onChange={this.handleChange} 
                            placeholder="Image Url"
                            autoComplete="off"
                        />
                        <button type="submit">Submit</button>
                        <h5>Already  have an account ? Then <Link to="/api/user/login" className ="link"> Log In </Link></h5>
                    </form>
                </div>
            </div>
        )
    }
}
export default Register;