import React from "react";
import {Link} from "react-router-dom";

class Nav extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={

        }
    }
    render()
    {
        let linkVal = "";
        if(this.props.isLoggedIn)
            linkVal ="/api/user/" + this.props.crntUser.userId +"/cart";
        return(
            <div className="nav">
                <div className="nav_box_1">
                    <h3><Link to="/" className="brnd">Gadget Point</Link></h3>
                </div>
                <div className="nav_box_2">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="nav_box_3">
                    <h4><Link to="/api/user/register">Register</Link></h4>
                    {this.props.isLoggedIn ? <button onClick = {this.props.logout}>Log Out</button> : <h4><Link to="/api/user/login">Log In</Link></h4>}
                    <h4><Link to="/api/gadgets/phones/all">Phones</Link></h4>
                    <h4><Link to="/api/gadgets/laptops/all">Laptops</Link></h4>
                    {this.props.isLoggedIn ? this.props.crntUser.username === "Admin" ? <h4><Link to="/api/gadgets/create">Gadget Create</Link></h4>:null:null}
                    {this.props.isLoggedIn ? <Link to ={linkVal}>Cart</Link> :null}
                </div>
            </div>
        )
    }
}
export default Nav;