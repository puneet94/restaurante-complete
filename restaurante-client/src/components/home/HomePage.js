
import React from "react";
import {connect} from 'react-redux';
import {getItems} from '../../actions/item';
import {addOrderItem,changeItemQuantity,removeOrderItem} from "../../actions/orderItem";
import ImageGallery from "./ImageGallery";
import {getItemTypes} from "../../actions/itemType";

import {
  Link
} from 'react-router-dom';
class HomePageComponent extends React.Component {
		constructor(props){
			super(props);
			this.state = {};
		}
	componentWillMount = async ()=>{
		await this.props.getItemTypes();
		await this.props.getItems();
		let categories = {};
		for(let i =0;i<this.props.categories.length;i++){
			categories[this.props.categories[i]] = false;
		}
		this.setState(categories);
	}
	addToCart = (item)=>{
		this.props.addOrderItem(item);
	}
	checkOrderItem = (id)=>{
		return (this.props.orderItems.indexOf(id)>-1)?false: true;
	}
	incrementItemQuantity = (id)=>{
		const item = this.props.orderItemsHash[id];
		
		this.props.changeItemQuantity(item,parseInt(item.quantity,10)+1);
	}
	
	decrementItemQuantity = (id)=>{
		const item = this.props.orderItemsHash[id];
		
		let quantity = parseInt(item.quantity,10)-1;
		if(quantity>0){
			this.props.changeItemQuantity(item,quantity);	
		}else{
			this.props.removeOrderItem(item);
		}
		
	}
	renderItems = (items)=>{
		return items.map((id)=>{
			const item = this.props.itemsHash[id];
			return (
				<div key={item._id}>	
					<h1 >{item.name}</h1>
					<h1 >{item.description}</h1>
					<h1 >{item.price}</h1>
					{this.checkOrderItem(item._id) ? <button onClick={() => this.addToCart(item)}>Add to cart</button>:<div>
						<button onClick={()=>this.incrementItemQuantity(item._id)}>Plus</button>
						<span>{this.props.orderItemsHash[id].quantity}</span>
						<button onClick={()=>this.decrementItemQuantity(item._id)}>Minus</button>
						<button onClick={()=>this.props.removeOrderItem(item)}>Remove</button>
					</div>}
				</div>
			);
		});
	}
	changeCategory = (category)=>{
		
		this.setState({
			[category]:!this.state[category]
			
		});
		
	}
	
	
	
	
	
	
	render=()=>{
		if(this.props.items && this.props.categories){
			return (
				<div>
					<ImageGallery/>
					{/*<div>{this.renderItems(this.props.items)}</div>*/}
					<div>{
						this.props.categories.map((categoryId)=>{
						
							const category = this.props.categoryHash[categoryId];
							
							return (<div key={categoryId}>
								<div className={"category"} onClick={()=>{this.changeCategory(categoryId)}}><h3>{category.name}</h3></div>
								{ this.state[categoryId] && <div>
									{
										this.props.categoryItemHash[category.name] && this.props.categoryItemHash[category.name].map((item)=>{
											return (
												<div className={"singleItem"} key={item._id}>	
													<div className={"itemStats"}>
														<div >{item.name}</div>
														<div>{item.price}{item.currency}</div>
														
													</div>
													
													<div className={"itemDescription"}>{item.description}</div>
													
													{this.checkOrderItem(item._id) ? 
														<div className={"itemButtons"}>
															<button className={"itemSingleButton"} onClick={() => this.addToCart(item)}>
																Add to cart
															</button>
														</div>:
														<div className={"itemButtons"}>
															<div className={"quantityButtons"}>
																<button className={"itemSingleButton decrementButton"} onClick={()=>this.decrementItemQuantity(item._id)}>-</button>
																<span>{this.props.orderItemsHash[item._id].quantity}</span>
																<button className={"itemSingleButton incrementButton"} onClick={()=>this.incrementItemQuantity(item._id)}>+</button>
															</div>
															<div className={"removeOrderButton"}>
																<button className={"itemSingleButton removeButton"} onClick={()=>this.props.removeOrderItem(item)}>Remove</button>
															</div>
														</div>
														
													}
												</div>
											);
										})
										
									}
								</div>}
							</div>);
						})
					}</div>
					
					<div>
						{this.props.orderItems.length ? <div style={{padding:"10px",margin:"50px"}}><Link to="/orderPage" className={"openCartLink"}>Open Cart</Link></div>:<div></div>}
					</div>
				</div>
				);
		}
		return(
			<h2>Not there</h2>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		items: state.item.items,
		itemsHash: state.item.itemsHash,
		orderItems: state.orderItem.orderItems,
		orderItemsHash: state.orderItem.orderItemsHash,
		categories: state.item.categories,
		categoryHash: state.item.categoryHash,
		categoryItemHash: state.item.categoryItemHash
	};
};
export default connect(mapStateToProps,{getItems,addOrderItem,changeItemQuantity,removeOrderItem,getItemTypes})(HomePageComponent);