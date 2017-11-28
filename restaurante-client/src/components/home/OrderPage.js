
import React from "react";
import {connect} from 'react-redux';
import {
  Link
} from 'react-router-dom';
import {changeItemQuantity,removeOrderItem} from "../../actions/orderItem";
import {addTotalToOrder,addItemsToOrder,submitOrder} from "../../actions/order";
import UserDetails from "../user/UserDetails";

class OrderPageComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loadingOrder: false
		};
		console.log(this.props);
	}
	incrementItemQuantity = (item)=>{
		
		this.props.changeItemQuantity(item,parseInt(item.quantity,10)+1);
	}
	calculateSum = (objectHash)=>{
		let currency;
		let val = Object.keys(objectHash).reduce((sum,item)=>{
			currency = objectHash[item].currency;
			 return sum+(parseInt(objectHash[item].price,10)*(parseInt(objectHash[item].quantity,10)));
		},0);
		
		
		return val+currency;
		
	}
	submitOrder = async ()=>{
		//this.props.addItemsToOrder(this.props.orderItemsHash);
		this.setState({
			loadingOrder: true
		});
		await this.props.submitOrder(this.props.orderItemsHash,this.props.user);
		this.setState({
			loadingOrder: false
		},()=>{
			this.props.history.push('/summary');	
		});
		
	}
	decrementItemQuantity = (item)=>{
		let quantity = parseInt(item.quantity,10)-1;
		if(quantity>0){
			this.props.changeItemQuantity(item,quantity);	
		}else{
			this.props.removeOrderItem(item);
		}
	}
	renderItems = (items)=>{
		return items.map((id)=>{
			const item = this.props.orderItemsHash[id];
			return (
				
				<div className={"singleItem"} key={item._id}>	
					<div className={"itemStats"}>
						<div >{item.name}</div>
						<div>{item.price}{item.currency}</div>
					</div>
													
					<div className={"itemDescription"}>{item.description}</div>
													
					<div className={"itemButtons"}>
							<div className={"quantityButtons"}>
								<button className={"itemSingleButton decrementButton"} onClick={()=>this.decrementItemQuantity(item)}>-</button>
								<span>{this.props.orderItemsHash[item._id].quantity}</span>
						<button className={"itemSingleButton incrementButton"} onClick={()=>this.incrementItemQuantity(item)}>+</button>
											</div>
										<div className={"removeOrderButton"}>
					<button className={"itemSingleButton removeButton"} onClick={()=>this.props.removeOrderItem(item)}>Remove</button>
															</div>
														</div>
														
													
												</div>
			
			);
		});
	}
	render=()=>{
		
		if(this.props.orderItems.length){
			return (
				<div>
					<div>{this.renderItems(this.props.orderItems)}</div>
					<h3>Total Amount - {this.calculateSum(this.props.orderItemsHash)}</h3>
					<UserDetails/>
					
					{!this.state.loadingOrder?<div style={{margin:"10px",padding:"10px"}}>
						<button className={"submitOrderButton"} disabled={!this.props.user.userEmail  || !this.props.user.userName || !this.props.user.userTable } onClick={()=>this.submitOrder()}>Submit Order</button>
						
						<div></div>
					</div>:<div><h3>Loading...</h3></div>}
				</div>
				);
			
		}
		return(
			<div>
			<h2>No items in your cart</h2>
			<Link to="/">Menu</Link></div>
		);
	}
}
const mapStateToProps=(state)=>{
	return {
		orderItems: state.orderItem.orderItems,
		orderItemsHash: state.orderItem.orderItemsHash,
		order: state.order,
		user: state.user
	};
};
export default connect(mapStateToProps,{changeItemQuantity,removeOrderItem,addTotalToOrder,addItemsToOrder,submitOrder})(OrderPageComponent);