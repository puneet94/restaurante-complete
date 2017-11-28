import axios from "axios";
import {URL} from "../types";


 const adminLogin = (credentials)=>{
    return axios.post(`${URL}admin/login`,{credentials}).then((res)=>{
        return res.data;
    });
};
const adminLogout = (credentials)=>{
    return axios.post(`${URL}admin/logout`,{credentials}).then((res)=>{
        return res.data;
    });
};
const getAdminOrders = async (token,params)=>{
    
       let response= await axios.get(`${URL}order/getOrders`,{
			headers:{
					'Authorization': `Bearer ${token}`
			},params});
			return response.data;
};
const updateOrder = async(token,payload)=>{
    let response  =await axios.post(`${URL}order/update/${payload.id}`,payload,{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    
    return response.data;
};
const adminApi = {
    getAdminOrders,
    adminLogin,
    adminLogout,
    updateOrder
};
export default adminApi;