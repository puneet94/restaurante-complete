/*
    price: {type: Number},
	name: {type:String},
	description: {type:String},
	picture: {type:String},
	currency: {type:String},
	stock: {type: Boolean},
	category: {type:String}
		*/
import React from "react";

class AddItemComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		    item: {
		        name: "",
		        currency: "",
		        price: 0,
		        description: "",
		        category: "",
		        itemType:""
		    }
		    
		};
	}
	onChange = (e) =>{
	    
	    this.setState({
	        item: {...this.state.item,[e.target.name]: e.target.value}
	    });
        
    };
    itemSubmit = (item)=>{
        if(!item.itemType){
            item.itemType = this.props.categories[0];
        }
        this.props.createItem(item);
        this.setState({
             item: {
		        name: "",
		        currency: "",
		        price: 0,
		        description: "",
		        category: "",
		        itemType:""
		    }
        });
    }
    renderEditMode = ()=>{
        return (
            <div>
                <div>
                    <div className={"itemName detailsFormContainer"}>
    	                    <label htmlFor="name">Name</label>
                            <input
                                className={"userFormInput"}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={this.state.item.name}
                                onChange={this.onChange}
                             />
    	                </div>
    	                <div className={"userEmail detailsFormContainer"}>
    	                    <label htmlFor="price">Price</label>
                            <input
                            className={"userFormInput"}
                                type="number"
                                id="price"
                                name="price"
                                
                                value={this.state.item.price}
                                onChange={this.onChange}
                             />
    	                </div>
    	                <div className={"currency detailsFormContainer"}>
    	                    <label htmlFor="currency">Currency</label>
                            <input
                            className={"userFormInput"}
                                type="text"
                                id="currency"
                                name="currency"
                                placeholder="0123456789"
                                value={this.state.item.currency}
                                onChange={this.onChange}
                             />
    	                </div>
    	                <div className={"description detailsFormContainer"}>
    	                    <label htmlFor="description">Notes</label>
                            <textarea
                            className={"userFormInput"}
                                rows="4" cols="20"
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Add something like: No onions in salad"
                                value={this.state.item.description}
                                onChange={this.onChange}
                             ></textarea>
    	                </div>
    	                <div className={"userTable detailsFormContainer"}>
    	                    <label >Category
                            <select name="itemType" value={this.state.item.itemType} onChange={this.onChange}>
                    	    {
                        		this.props.categories.map((category)=>{
                        			return (<option key={category} value={category}>{this.props.categoriesHash[category].name}</option>);
                        		})
                    	    }
                    </select></label>
    	                </div>
                    
                </div>
                <div className={"editSumitButton"}>
                    <button onClick={()=>this.itemSubmit(this.state.item)}>Submit</button>
                   </div> 
            </div>
            );
    }
	render=()=>{
	        
	        return (<div>{this.renderEditMode()}</div>);
	    
	}
}
export default AddItemComponent;