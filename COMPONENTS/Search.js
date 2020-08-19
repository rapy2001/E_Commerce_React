import React from "react";
import Axios from "axios";

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
            smt:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                smt:true
            })
        })
        .catch((err)=>{
            this.setState({
                err:true,
                smt:true
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
                for(let i = 0;i<this.state.results.length;i++)
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
            <div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input 
                            type = "text" 
                            name = "search" 
                            value = {this.state.search} 
                            placeholder = "Search Term" 
                            onChange = {this.handleChange}
                        />
                        <button type = "submit">Search</button>
                    </form>
                </div>
                <div>
                    {this.state.smt ?
                         this.state.results.length > 0 ? 
                         <div><h5>The following results were found for "{this.state.search}"</h5><div>{rst}</div></div>
                         :<h4>No Results were found !</h4>:null
                    }
                </div>
            </div>
        )
    }
}
export default Search;