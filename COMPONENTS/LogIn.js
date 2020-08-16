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
            })
        })
    }
    render()
    {
        // console.log(this.props);
        return(
            <div>
                <div>

                </div>
                <div>
                <form onSubmit={this.handleSubmit}>
                    {this.state.scs ? <h4>Log In  Successfull. You will be redirected shortly.</h4> : null}
                    {this.state.err ? <h4>Internal Server Error. Please try again.</h4>:null}
                    {this.state.nameErr ? <h4>Username does not already exists. Please Register.</h4> : null}
                    {this.state.pwdErr ? <h4>Password is Wrong. Please try again.</h4>:null}
                    {this.props.location.msg !== undefined ? <h4>{this.props.location.msg}</h4> : null}
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
                    <h5>Don't have an account ? Then <Link to="/api/user/register"> Register </Link></h5>
                </form>
                </div>
            </div>
        )
    }
}
export default Login;