import axios from "axios";
import {URL} from "../types";


const fetchUserDetails = async (token,userId)=>{
    
       let response= await axios.get(`${URL}user/get/${userId}`,{
			headers:{
					'Authorization': `Bearer ${token}`
			}});
			return response.data;
};
const setUserDetails = async ()=>{
    let response  = await axios.post(`${URL}user/create`);
    return response.data;
};
const fetchUserOrders = async (token,userId)=>{
       let response= await axios.get(`${URL}user/orders/${userId}`,{
			headers:{
					'Authorization': `Bearer ${token}`
			}});
			return response.data;
};
const updateUserDetails = async(token,payload,userId)=>{
    let response  =await axios.post(`${URL}user/update/${userId}`,{user:payload},{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    
    return response.data;
};
const userApi = {
    fetchUserDetails,
    fetchUserOrders,
    setUserDetails,
    updateUserDetails
};
export default userApi;