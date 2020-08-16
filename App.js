import React from "react";
import {BrowserRouter as Router ,Switch,Redirect,Route} from "react-router-dom";
import Homepage from "./COMPONENTS/Homepage";
import Nav from "./COMPONENTS/Nav";
import Register from "./COMPONENTS/Register";
import LogIn from "./COMPONENTS/LogIn";
import Phones from "./COMPONENTS/Phones";
import Laptops from "./COMPONENTS/Laptops";
import GadgetCreate from "./COMPONENTS/GadgetCreate";
import GadgetFull from "./COMPONENTS/GadgetFull";
import ReviewForm from "./COMPONENTS/ReviewForm";
import ReviewUpdate from "./COMPONENTS/ReviewUpdate";
import GadgetUpdate from "./COMPONENTS/GadgetUpdate";
import UserCart from "./COMPONENTS/UserCart";
import Footer from "./COMPONENTS/Footer";
import Error from "./COMPONENTS/Error";
import "./style.css";
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            crntUser:{},
            isLoggedIn:false
        }
        this.login=this.login.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    login(user)
    {
        this.setState({
            crntUser:user,
            isLoggedIn:true
        })
    }
    logOut()
    {
        this.setState({
            crntUser:{},
            isLoggedIn:false
        })
    }
    render()
    {
        console.log(this.state.crntUser);
        return(
            <div>
                <Router>
                    <Nav logout = {this.logOut} isLoggedIn  = {this.state.isLoggedIn} crntUser = {this.state.crntUser}/>
                    <Switch>
                        <Route path="/" exact component={Homepage}/>
                        <Route path="/api/user/register" exact component={Register}/>
                        <Route path="/api/user/login" exact render={(props)=>{
                            return(
                                <LogIn {...props} logFn={this.login}/>
                            )
                        }}/>
                        <Route path="/api/gadgets/phones/all" exact render = {(props)=>{
                            return(
                                <Phones {...props} />
                            )
                            
                        }} />
                        <Route path="/api/gadgets/laptops/all" exact render = {(props)=>{
                            return(
                                <Laptops {...props} />
                            )
                            
                        }} />
                        <Route path = "/api/gadgets/create" exact render = {(props) =>{
                            if(this.state.isLoggedIn)
                            {
                                if(this.state.crntUser.username === "Admin")
                                    return(
                                    <GadgetCreate {...props} crntUser = {this.state.crntUser}/>
                                    )
                                else
                                {
                                    return (
                                        <Redirect to = {{
                                           pathname:"/api/user/login",
                                           msg:"You need to be logged in as the Admin to add a Gadget" 
                                        }}/>
                                    )
                                }
                            }
                            else
                            {
                                return (
                                    <Redirect to = {{
                                       pathname:"/api/user/login",
                                       msg:"You need to be logged in as the Admin to add a Gadget" 
                                    }}/>
                                )
                            }
                        }}/>
                        <Route path = "/api/gadget/:id/show" exact render = {(props)=>{
                            return(<GadgetFull {...props} isLoggedIn  = {this.state.isLoggedIn} crntUser = {this.state.crntUser}/>)
                        }}/>
                        <Route path = "/api/gadget/:id/review/add" exact render = {(props)=>{
                            if(this.state.isLoggedIn)
                            {
                                return(
                                    <ReviewForm {...props} isLoggedIn ={this.state.isLoggedIn} crntUser = {this.state.crntUser}/>
                                )
                            }
                            else
                            {
                                return (
                                    <Redirect to = {{
                                        pathname:"/api/user/login",
                                        msg:"Please log in to add a Reveiew"
                                    }}/>
                                )
                            }
                        }}/>
                        <Route path = "/api/review/:id/update" render = {(props)=>{
                            if(this.state.isLoggedIn)
                            {
                                return(
                                    <ReviewUpdate {...props} crntUser ={this.state.crntUser} isLoggedIn ={this.state.isLoggedIn}/>
                                )
                            }
                            else
                            {
                                return(<Redirect to = {{
                                    pathname:"/api/user/login",
                                    msg:"Please Log in as the Owner of this review to update"
                                }}/>)
                            }
                            
                        }}/>
                        <Route path = "/api/gadget/:id/update" exact render ={(props)=>{
                            if(this.state.isLoggedIn)
                            {
                                if(this.state.crntUser.username === "Admin")
                                {
                                    return(
                                        <GadgetUpdate {...props} isLoggedIn ={this.state.isLoggedIn} crntUser ={this.state.crntUser}/>
                                    )
                                }
                                else
                                {
                                    return(<Redirect to = {{
                                        pathname:"/api/user/login",
                                        msg:"Please Log in as the Admin to Update Gadget Details"
                                    }}/>)
                                }
                            }
                            else
                            {
                                return(<Redirect to = {{
                                    pathname:"/api/user/login",
                                    msg:"Please Log in as the Admin to Update Gadget Details"
                                }}/>)
                            }
                        }}/>
                        <Route path ="/api/user/:id/cart" exact render={(props)=>{
                            if(this.state.isLoggedIn)
                            {
                                return(
                                    <UserCart {...props} isLoggedIn ={this.state.isLoggedIn} crntUser ={this.state.crntUser}/>
                                )
                            }
                            else
                            {
                                return(<Redirect to = {{
                                    pathname:"/api/user/login",
                                    msg:"Please Log in to view cart"
                                }}/>)
                            }
                        }}/>
                        <Route component={Error}/>
                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}
export default App;