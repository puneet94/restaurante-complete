import { GET_ITEMS,GET_ADMIN_ITEMS,UPDATE_ITEM } from "../types";
import itemApi from "../api/item";
export const getItems = ()=>{
    return async (dispatch)=>{
        let items =await  itemApi.getItems();
        dispatch({type:GET_ITEMS,payload:items});
    };
};
export const getAdminItems = ()=>{
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
        let items =await  itemApi.getAdminItems(token);
        dispatch({type:GET_ADMIN_ITEMS,payload:items});
    };
};

export const createItem = (item)=>{
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
        let response = await itemApi.createItem(token,item);
        dispatch({type:GET_ADMIN_ITEMS,payload:[response]});
    };
};

export const updateItem = (item)=>{
    console.log("update item action");
    console.log(item);
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
        await itemApi.updateItem(token,item);
        dispatch({type:UPDATE_ITEM,payload:item});
    };
};

