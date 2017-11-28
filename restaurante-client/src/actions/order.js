import { ADD_TOTAL_TO_ORDER,ADD_ITEMS_TO_ORDER,ORDER_RECEIVED } from "../types";

import orderApi from "../api/order";
export const addTotalToOrder = (total,currency)=>{
    return (dispatch)=>{
        dispatch({type:ADD_TOTAL_TO_ORDER,payload:{total,currency}});
    };
};


export const addItemsToOrder = (payload)=>{
    return (dispatch)=>{
        dispatch({type:ADD_ITEMS_TO_ORDER,payload});
    };
};

export const submitOrder = (orderItemsHash,user)=>{
    return async(dispatch)=>{
        const orderItems =  Object.keys(orderItemsHash).map((item)=>{
	            return orderItemsHash[item];
        });
		let currency;
		let price = Object.keys(orderItemsHash).reduce((sum,item)=>{
			currency = orderItemsHash[item].currency;
			 return sum+(parseInt(orderItemsHash[item].price,10)*parseInt(orderItemsHash[item].quantity,10));
		},0);
        let order = await orderApi.submitOrder({items:orderItems,price,currency,user});
        
        
        dispatch({type:ORDER_RECEIVED,payload: order});
    };
};