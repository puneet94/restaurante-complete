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

class AdminItemComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		    editMode: false,
		    item: this.props.item
		    
		};
	}
	submitEdit = (item)=>{
		console.log("updated item");
		console.log(item);
		this.props.updateItem(item);
		this.setState({
			editMode:false
		});
	}
	
	onChange = (e) =>{
	    
	    let eventValue = e.target.value;
	    if(e.target.name==="stock"){
	    
	            eventValue= e.target.checked;
	        
	    }
	    this.setState({
	        item: {...this.state.item,[e.target.name]: eventValue}
	    });
        
    };
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
    	                <div className={"stock detailsFormContainer"}>
    	                    <label htmlFor="stock">Stock</label>
                            <input
                            className={"userFormInput"}
                                type="checkbox"
                                id="stock"
                                name="stock"
                                checked={this.state.item.stock}
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
	                    		</select>
                    		</label>
    	                </div>
                </div>
                <div className={"editSumitButton"}>
                    <button onClick={()=>{this.submitEdit(this.state.item)}}>Submit</button>
                </div> 
            </div>
            );
    }
	render=()=>{
	        const item = this.state.item;
	        return (
	        <div className={"adminSingleItem"}>
	            <div className={"singleItem"} key={item._id}>	
					<div className={"itemStats"}>
						<div >{item.name}</div>
						<div>{item.price}{item.currency}</div>
					</div>
													
					<div className={"itemDescription"}>{item.description}</div>
													
					<div className={"itemButtons"}>
						
						<div className={"editeItemButton"}>
							<button className={"itemSingleButton editButton"} onClick={()=>this.setState({editMode:!this.state.editMode})}>{this.state.editMode?"Cancel":"Edit"}</button>
						</div>
					</div>
				</div>
				{this.state.editMode && this.renderEditMode()}
	        </div>);
	    
	}
}
export default AdminItemComponent;