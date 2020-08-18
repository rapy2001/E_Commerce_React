import React from "react";
import Axios from "axios";
import {Link , Redirect} from "react-router-dom";
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:"",
            password:"",
            nameErr:false,
            pwdErr:false,
            scs:false,
            err:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.rdr=this.rdr.bind(this);
        this.reset = this.reset.bind(this);
    }
    reset()
    {
        this.setState({
            nameErr:false,
            pwdErr:false,
            scs:false,
            err:false
        });
    }
    rdr()
    {
        console.log("working");
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
        let linkVal="http://localhost:5000/api/user/login";
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
                    username:"",
                    password:"",
                    nameErr:true,
                    pwdErr:false,
                    scs:false,
                    err:false
                },()=>{
                    setTimeout(this.reset,1500);
                })
            }
            else if(res.data.flag===1)
            {
                this.props.logFn(res.data.user);
                this.setState({
                    username:"",
                    password:"",
                    nameErr:false,
                    pwdErr:false,
                    scs:true,
                    err:false
                },()=>{
                    console.log("Working");
                    setTimeout(this.rdr,1500);
                })
            }
            else if(res.data.flag===0)
            {
                this.setState({
                    username:"",
                    password:"",
                    nameErr:false,
                    pwdErr:true,
                    scs:false,
                    err:false
                },()=>{
                    setTimeout(this.reset,1500);
                })
            }
        })
        .catch(err=>{
            this.setState({
                username:"",
                password:"",
                nameErr:false,
                pwdErr:false,
                scs:false,
                err:true
            },()=>{
                setTimeout(this.reset,1500);
            })
        })
    }
    render()
    {
        // console.log(this.props);
        return(
            <div className = "register">
                
                <div className = "register_box_2">
                    <form onSubmit={this.handleSubmit} className = "form">
                        {this.state.scs ? <h4 className = "success">Log In  Successfull. You will be redirected shortly.</h4> : null}
                        {this.state.err ? <h4 className = "failure">Internal Server Error. Please try again.</h4>:null}
                        {this.state.nameErr ? <h4 className = "failure">Username does not  exists. Please Register.</h4> : null}
                        {this.state.pwdErr ? <h4 className = "failure">Password is Wrong. Please try again.</h4>:null}
                        {this.props.location.msg !== undefined ? <h4 className = "failure">{this.props.location.msg}</h4> : null}
                        <h3>Log In</h3>
                        <input 
                            type="text" 
                            name="username"
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            required="required" 
                            placeholder="User Name"
                            autoComplete="off"
                        />
                        <input 
                            type="password" 
                            name="password"
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            required="required" 
                            placeholder="Password"
                            autoComplete="off"
                        />
                        <button type="submit">Submit</button>
                        <h5>Don't have an account ? Then <Link to="/api/user/register" className ="link"> Register </Link></h5>
                    </form>
                </div>
                <div className = "register_box_1 login_box_2">
                    <h1>Gadget Point</h1>
                </div>
            </div>
        )
    }
}
export default Login;