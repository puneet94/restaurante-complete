/*
    sortOrder: {type: Number},
	name: {type:String},
	description: {type:String},
	picture: {type:String},
	currency: {type:String},
	stock: {type: Boolean},
	category: {type:String}
		*/
import React from "react";

class AddCategoryComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		    category: {
		        name: "",
		        sortOrder: 0,
		        description: "",
		        
		    }
		    
		};
	}
	onChange = (e) =>{
	    this.setState({
	        category: {...this.state.category,[e.target.name]: e.target.value}
	    });
        
    };
    renderEditMode = ()=>{
        return (
            <div>
                <div>
                    <div className={"categoryName detailsFormContainer"}>
    	                    <label htmlFor="name">Name</label>
                            <input
                                className={"userFormInput"}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={this.state.category.name}
                                onChange={this.onChange}
                             />
    	                </div>
    	                <div className={"userEmail detailsFormContainer"}>
    	                    <label htmlFor="sortOrder">Sort Order</label>
                            <input
                            className={"userFormInput"}
                                type="number"
                                id="sortOrder"
                                name="sortOrder"
                                value={this.state.category.sortOrder}
                                onChange={this.onChange}
                             />
    	                </div>
    	                <div className={"description detailsFormContainer"}>
    	                    <label htmlFor="description">Description</label>
                            <textarea
                            className={"userFormInput"}
                                rows="4" cols="20"
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Add something like: No onions in salad"
                                value={this.state.category.description}
                                onChange={this.onChange}
                             ></textarea>
    	                </div>
                    
                </div>
                <div className={"editSumitButton"}>
                    <button onClick={()=>{console.log(this.state.category);this.props.createItemType(this.state.category)}}>Submit</button>
                   </div> 
            </div>
            );
    }
	render=()=>{
	        
	        return (<div>{this.renderEditMode()}</div>);
	    
	}
}
export default AddCategoryComponent;