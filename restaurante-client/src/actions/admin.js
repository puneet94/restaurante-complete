import { ADMIN_LOGIN,ADMIN_LOGOUT ,GET_ORDERS,SET_ORDERS_TYPE,UPDATE_ORDER_TYPE} from "../types";
import adminApi from "../api/admin";

export const adminLogin = (credentials)=>{
    return async (dispatch)=>{
        let response =  await adminApi.adminLogin(credentials);
        
        window.localStorage.setItem('adminToken',JSON.stringify(response.admin.token));
        dispatch({type:ADMIN_LOGIN,payload:response.admin});
    };
};

export const adminLogout = ()=>{
    return  (dispatch)=>{
        window.localStorage.setItem('adminToken',null);
        dispatch({type:ADMIN_LOGOUT});
    };
};

export const getAdminOrders = (type)=>{
    console.log("hit hit");
    console.log(type);
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
        
        
        let response  = await adminApi.getAdminOrders(token,{type});
        console.log("response for orders");
        console.log(response);
        dispatch({type:GET_ORDERS,payload:response});
        
    };
};
export const setOrdersType = (type)=>{
    //getAdminOrders(type);
    return (dispatch)=>{
        dispatch({type:SET_ORDERS_TYPE,payload:type});
    };
};
export const updateOrderType = (id,type)=>{
    console.log("type received");
    console.log(type);
    return async (dispatch,getState)=>{
        const {token} = getState().admin;   
         await adminApi.updateOrder(token,{id,type});
        dispatch({type:UPDATE_ORDER_TYPE,payload:id});
    };
};

