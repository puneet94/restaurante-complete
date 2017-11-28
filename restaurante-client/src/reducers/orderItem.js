import {ADD_ORDER_ITEM,CHANGE_ITEM_QUANTITY,REMOVE_ORDER_ITEM,ORDER_RECEIVED} from "../types.js";
//import keyBy from "lodash/keyBy";
import keys from "lodash/keys";
/*const INITIAL_STATE = {
	orderItemsHash: {
	    
	},
	orderItems:[]
};*/
let orderItemLocalStorage =null;
if( window.localStorage.getItem('orderItem')){
	orderItemLocalStorage = JSON.parse(window.localStorage.getItem('orderItem'));
}
const INITIAL_STATE = 
   orderItemLocalStorage||{
  	orderItemsHash: {
	    
	},
	orderItems:[]
  	
  };

const sliceArray = (inputArray,value)=>{
	const indexRemoved = inputArray.indexOf(value);
	if(indexRemoved>-1){
		const outputArray  = [...inputArray.slice(0,indexRemoved),...inputArray.slice(indexRemoved+1)];
		return outputArray;
	}else{
		return inputArray;
	}
	
};
const orderItem = (state=INITIAL_STATE,action) =>{
	
	
    switch(action.type){
        case ADD_ORDER_ITEM:
            let orderItemsHashNew = {[action.payload._id]:action.payload};
            orderItemsHashNew[action.payload._id].quantity = 1;
    		let orderItemsNew = keys(orderItemsHashNew);
		    const orderItemNewState = {...state, orderItemsHash:{...state.orderItemsHash,...orderItemsHashNew},orderItems:[...state.orderItems,...orderItemsNew] };
		    return orderItemNewState;
		case CHANGE_ITEM_QUANTITY:
		     let quantityorderItemsHashNew = {[action.payload.item._id]:action.payload.item};
		     quantityorderItemsHashNew[action.payload.item._id].quantity = parseInt(action.payload.quantity,10);
		     
		     const quantityOrderItemNewState = {...state, orderItemsHash:{...state.orderItemsHash,...quantityorderItemsHashNew} };
		     
		     return quantityOrderItemNewState;
        case REMOVE_ORDER_ITEM:
        	const newOrderItemsHash = {...state.orderItemsHash};
        	delete newOrderItemsHash[action.payload._id] ;
        	const orderItems = sliceArray(state.orderItems,action.payload._id);
            return {...state,orderItems,orderItemsHash:{...newOrderItemsHash}};
        case ORDER_RECEIVED:
        	return {orderItemsHash:{},orderItems:[]};
        default:
            return state;
    }
};
export default orderItem;