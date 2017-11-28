
import React from "react";
import {connect} from 'react-redux';
import {fetchUserOrders} from "../../actions/user";
import Moment from 'moment';
class UserOrdersComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		
		};
	}
	componentWillMount  =async()=>{
	  if(this.props.userId){
	    await this.props.fetchUserOrders(this.props.userId);
	  }
	    
	}
	
	
    
    renderOrderItems = (orderItems)=>{
    	return orderItems.map((item)=>{
    	  
    		return (
    			<div className="orderItem" key={item._id}>
      <div className="orderQuantity">
        {item.quantity}
      </div>
      <div className="orderItemName">
        {item.item.name}
      </div>
      <div className="orderItemPrice">
        {item.price}{item.item.currency}
      </div>
    </div>
				
				
			
			);
    	});
    	
    }
	render=()=>{
	    if(this.props.orders){
			return (
			    <div>
			    	
			        {this.props.orders.map((order)=>{
			              
			            return (
			              
			                <div key={order._id} className="singleOrder">
                      <div className="orderHeader">
                        <div className="orderStatus">
                          {order.state}
                        </div>
                        <div className="orderTime">
                          {Moment(order.time).format('MMM Do, h:mm a')}
                        </div>
                        
                        <div className="orderPrice">
                          {order.price}{order.orderItems[0].item.currency}
                        </div>
                        
                      </div>
                      <div className="orderHeadings">
                        <div>
                          Quantity
                        </div>
                        <div>
                          Item
                        </div>
                        <div>
                          Price
                        </div>
                      </div>
                      <div className="orderDetails">
                        {this.renderOrderItems(order.orderItems)}
                      </div>
                      <div className="orderUserInfo">
                        <div className="orderUserName">
                          {order.user.userName}-{order.table}
                        </div>
                        <div className="orderNotes">
                          <div>{order.notes}</div>
                        </div>
                      </div>
                    </div>
			            );
			        })}
			    </div>
			    );
			
		
	    }else{
	        return (
	                <div>No orders</div>
	            );
	    }
	}
}
const mapStateToProps=(state)=>{
	return {
		
		orders: state.user.orders,
		userId:state.user.userId
		
		
	};
};
export default connect(mapStateToProps,{fetchUserOrders})(UserOrdersComponent);