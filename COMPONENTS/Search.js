import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            search:"",
            results:[],
            scs:false,
            err:false,
            smt:false,
            term:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }
    reset()
    {
        this.setState({
            err:false
        })
    }
    handleChange(e)
    {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    handleSubmit(e)
    {
        e.preventDefault();
        let linkVal = "http://localhost:5000/api/search";
        Axios.post(linkVal,{search:this.state.search})
        .then((res)=>{
            this.setState({
                results:res.data.results,
                scs:true,
                smt:true,
                term:this.state.search,
                search:""
            })
        })
        .catch((err)=>{
            this.setState({
                err:true,
                smt:true,
                term:this.state.search,
                search:""
            },()=>{
                setTimeout(this.reset,1500);
            })
        })
    }
    render()
    {
        console.log(this.state);
        let rst = [];
        if(this.state.smt)
        {
            if(this.state.results.length > 0)
            {
                let results  = this.state.results;
                for(let i = 0;i<results.length;i++)
                {
                    let linkVal = "/api/gadget/" + results[i]._id + "/show";
                    rst.push(
                        <div key = {i}>
                            <img src = {results[i].imageUrl} alt="error"/>
                            <h3>Name: {results[i].gadgetName}</h3>
                            <h3>Price: $ {results[i].price}</h3>
                            <Link to = {linkVal}>Learn More</Link>
                        </div>
                    )
                }
            }
        }
        return(
            <div className = "search_container ">
                <div className = "search_form_container">
                    <form onSubmit = {this.handleSubmit} className = "form">
                        <h3>Search a Gadget</h3>
                        <input 
                            type = "text" 
                            name = "search" 
                            value = {this.state.search} 
                            placeholder = "Search Term" 
                            onChange = {this.handleChange}
                            autoComplete = "off"
                        />
                        <button type = "submit">Search</button>
                    </form>
                </div>
                <div className = "search_results_box">
                    {this.state.smt ?
                        this.state.results.length > 0 ? 
                        <div className = "search_results"><h5>The following results were found for "{this.state.term}"</h5><div>{rst}</div></div>
                        :<h4 className = "failure">No Results were found for "{this.state.term}" !</h4>:null
                    }
                </div>
            </div>
        )
    }
}
export default Search;