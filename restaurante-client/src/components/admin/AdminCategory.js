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

class AdminCategoryComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		    editMode: false,
		    category: this.props.category
		    
		};
	}
	onChange = (e) =>{
	    this.setState({
	        category: {...this.state.category,[e.target.name]: e.target.value}
	    });
        
    };
    submitEdit = (category)=>{
    	console.log("component");
    	console.log(category);
    	this.props.updateItemType(category);
    	this.setState({editMode:false});
    }
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
                    <button onClick={()=>this.submitEdit(this.state.category)}>Submit</button>
                </div> 
                </div>
            );
    }
	render=()=>{
	        const category = this.state.category;
	        return (
	        <div className={"adminSingleCategory"}>
	            <div className={"singleCategory"} key={category._id}>	
					<div className={"categoryStats"}>
						<div >{category.name}</div>
						<div>{category.sortOrder}</div>
					</div>
													
					<div className={"categoryDescription"}>{category.description}</div>
													
					<div className={"categoryButtons"}>
						
						<div className={"editeCategoryButton"}>
							<button className={"categorySingleButton editButton"} onClick={()=>this.setState({editMode:!this.state.editMode})}>{this.state.editMode?"Cancel":"Edit"}</button>
						</div>
					</div>
				</div>
				{this.state.editMode && this.renderEditMode()}
	        </div>);
	    
	}
}
export default AdminCategoryComponent;