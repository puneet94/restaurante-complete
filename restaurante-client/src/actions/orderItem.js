import { ADD_ORDER_ITEM,CHANGE_ITEM_QUANTITY,REMOVE_ORDER_ITEM } from "../types";

export const addOrderItem = (item)=>{
    return (dispatch)=>{
        dispatch({type:ADD_ORDER_ITEM,payload:item});
    };
};
export const removeOrderItem = (item)=>{
    return (dispatch)=>{
        dispatch({type:REMOVE_ORDER_ITEM,payload:item});
    };
};

export const changeItemQuantity = (item,quantity)=>{
    
    return (dispatch)=>{
        dispatch({type:CHANGE_ITEM_QUANTITY,payload:{item,quantity}});
    };
};
