import {ADD_TOTAL_TO_ORDER,ADD_ITEMS_TO_ORDER,ORDER_RECEIVED} from "../types.js";
//import keyBy from "lodash/keyBy";
//import keys from "lodash/keys";
const INITIAL_STATE = {
	total: 0,
	currency: null,
	orderItems:[],
	finalOrder: {}
};
const order = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case ADD_TOTAL_TO_ORDER:
            return {...state,total:action.payload.total,currency:action.payload.currency};
        case ADD_ITEMS_TO_ORDER:
            const orderItemsHash = action.payload;
            const orderItems =  Object.keys(orderItemsHash).map((item)=>{
	            return orderItemsHash[item];
            });
            return {...state,orderItems};
        case ORDER_RECEIVED:
            return {...state,finalOrder:{...action.payload}};
        default:
            return state;
    }
};
export default order;