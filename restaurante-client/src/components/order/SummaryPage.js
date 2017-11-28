
import React from "react";
import {connect} from 'react-redux';
import {
  Link
} from 'react-router-dom';


class SummaryPageComponent extends React.Component {
	renderOrder = (order)=>{
	    return (
	        <div>
	            <div><h3>Your order is {order.state}</h3></div>
	            {
	                order.orderItems.map((orderItem)=>{
	                    return (
	                        <div key={orderItem._id}>
	                            <div>{orderItem.item.name}</div>
	                            <div>{orderItem.quantity}</div>
	                            <div>{orderItem.price}{orderItem.item.currency}</div>
	                        </div>
	                    );
	                })
	                
	            }
	            <div><h3>Total:{order.price}{order.orderItems[0].currency}</h3></div>
	        </div>
	        );
	}
	
	render=()=>{
		if(this.props.order.orderItems){
			return (
				<div>
					<div>{this.renderOrder(this.props.order)}</div>
					<div>
						<Link to="/">Menu</Link>
					</div>
				</div>
				);
			
		}else{
		    return (<div><h2>Nothing here</h2></div>);
		}
		
	}
}
const mapStateToProps=(state)=>{
	return {
		order: state.order.finalOrder
	};
};
export default connect(mapStateToProps,{})(SummaryPageComponent);