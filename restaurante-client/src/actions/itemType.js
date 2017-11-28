import { UPDATE_CATEGORY,GET_ADMIN_CATEGORIES,GET_CATEGORIES } from "../types";
import itemTypeApi from "../api/itemType";
export const getItemTypes = ()=>{
    return async (dispatch,getState)=>{
        const {token}  = getState().admin;
        let itemTypes =await  itemTypeApi.getItemTypes(token);
        
        dispatch({type:GET_ADMIN_CATEGORIES,payload:itemTypes});
        dispatch({type:GET_CATEGORIES,payload:itemTypes});
    };
};

export const createItemType = (itemType)=>{
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
        let response = await itemTypeApi.createItemType(token,itemType);
        
        dispatch({type:GET_ADMIN_CATEGORIES,payload:[response]});
    };
};

export const updateItemType = (itemType)=>{
    
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
        await itemTypeApi.updateItemType(token,itemType);
        dispatch({type:UPDATE_CATEGORY,payload:itemType});
    };
};

