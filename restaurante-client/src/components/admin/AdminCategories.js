
import React from "react";
import {connect} from 'react-redux';
import AddCategory from "./AddCategory";
import AdminCategory from "./AdminCategory";
import {createItemType,updateItemType} from "../../actions/itemType";
class AdminCategoriesComponent extends React.Component {
	
    componentWillMount = ()=>{
        
    }
    
	render=()=>{
	    return (
	    	<div>
	    	<AddCategory createItemType = {this.props.createItemType}/>
	    	<div>
	    		{this.props.categories.map((categoryId)=>{
	    		return (
		    		<AdminCategory
		    		key={categoryId}
		    		category={this.props.categoriesHash[categoryId]} 
		    		categoriesHash={this.props.categoriesHash} 
		    		categories={this.props.categories}
		    		updateItemType = {this.props.updateItemType}
		    		/>
	    		);
	    	})}
	    	
	    	</div></div>);
	}
}
const mapStateToProps=(state)=>{
	return {
		categories: state.admin.categories,
		categoriesHash: state.admin.categoriesHash
	};
};
export default connect(mapStateToProps,{createItemType,updateItemType})(AdminCategoriesComponent);