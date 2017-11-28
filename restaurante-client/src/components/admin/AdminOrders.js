
import React from "react";
import {connect} from 'react-redux';
import {getAdminOrders,setOrdersType,updateOrderType} from "../../actions/admin";
import Moment from 'moment';
class AdminOrdersComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		
		};
	}
	renderOrderSelect = (id,orderType)=>{
		return (
  		<div>
      	 <label>
            <select value={orderType} onChange={(event)=>this.props.updateOrderType(id,event.target.value)}>
              <option value="Received">Received</option>
              <option value="Completed">Completed</option>
              <option value="Progress">In Progress</option>
            </select>
          </label>
      </div>
    );
	}
	handleChange = (event)=>{
		this.props.setOrdersType(event.target.value);
		this.props.getAdminOrders(event.target.value);
	}
    componentWillMount = ()=>{
        this.props.getAdminOrders("All");
        this.props.setOrdersType("All");
    }
    
    renderSelect = ()=>{
    	return (<div>
    	 <label>
          Select order status
          <select value={this.props.ordersType} onChange={this.handleChange}>
            <option value="Received">Received</option>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Progress">In Progress</option>
            
          </select>
        </label></div>);
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
			    	{this.renderSelect()}
			        {this.props.orders.map((id)=>{
			            const order = this.props.ordersHash[id];
			            return (
			                
			                <div key={order._id} className="singleOrder">
  <div className="orderHeader">
    <div className="orderPrice">
      {order.price}
    </div>
    
    <div className="orderTime">
      {Moment(order.time).format('MMM Do, h:mm a')}
    </div>
    <div className="orderStatus">
      {this.renderOrderSelect(order._id,order.state)}
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
      {order.user.name}-{order.table}
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
		ordersHash: state.admin.ordersHash,
		orders: state.admin.orders,
		ordersType: state.admin.ordersType
		
	};
};
export default connect(mapStateToProps,{getAdminOrders,setOrdersType,updateOrderType})(AdminOrdersComponent);