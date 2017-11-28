
import React from "react";
import {connect} from 'react-redux';
import {createItem,updateItem} from "../../actions/item";
import AdminItem from "./AdminItem";
import AddItem from "./AddItem";
class AdminItemsComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
    
    
	render=()=>{
		return (
			<div>
			<AddItem categoriesHash={this.props.categoriesHash} 
		    		categories={this.props.categories}
		    		createItem = {this.props.createItem}
		    		/>
		    		{this.props.items?<div>
	    	{this.props.items.map((itemId)=>{
	    		return (
		    		<AdminItem 
		    		key={itemId}
		    		item={this.props.itemsHash[itemId]} 
		    		categoriesHash={this.props.categoriesHash} 
		    		categories={this.props.categories}
		    		updateItem = {this.props.updateItem}
		    		/>
	    		);
	    	})}
	    </div>:<div>Loaidng..</div>}
			</div>);
		
	}
}
const mapStateToProps=(state)=>{
	
	return {
		items: state.admin.adminItems,
		itemsHash: state.admin.adminItemsHash,
		categoriesHash: state.admin.categoriesHash,
		categories:state.admin.categories
		
	};
};
export default connect(mapStateToProps,{createItem,updateItem})(AdminItemsComponent);