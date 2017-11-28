import { ADD_USER_DETAILS } from "../types";
import userApi from "../api/user";
export const addUserDetails = (userId,payload)=>{
    return async (dispatch,getState)=>{
        const token = getState().user.userToken;
        dispatch({type:ADD_USER_DETAILS,payload});
        await userApi.updateUserDetails(token,payload,userId);
    };
};
export const fetchUserDetails = (userId)=>{
    return async (dispatch,getState)=>{
        const token = getState().user.userToken;
        let payload = await userApi.fetchUserDetails(token,userId);
        console.log("user details");
        console.log(payload);
        dispatch({type:ADD_USER_DETAILS,payload:{...payload,userId:payload._id}});
    };
};
export const fetchUserOrders = (userId)=>{
    return async (dispatch,getState)=>{
        const token = getState().user.userToken;
        let orders = await userApi.fetchUserOrders(token,userId);
        console.log(":orders fetch payload");
        console.log(orders);
        dispatch({type:ADD_USER_DETAILS,payload:{orders}});
    };
};

export const setUserDetails = ()=>{
    return async (dispatch)=>{
        let payload = await userApi.setUserDetails();
        const {userId,userToken} = payload.user;
        dispatch({type:ADD_USER_DETAILS,payload:{userId,userToken}});
        window.localStorage.setItem('userId',JSON.stringify(userId));
        window.localStorage.setItem('userToken',JSON.stringify(userToken));
        
    };
};
