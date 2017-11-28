import axios from "axios";
import {URL} from "../types";

 const getItems = ()=>{
    return axios.get(`${URL}item/getItems`).then((res)=>{
        return res.data;
    });
};
 const createItem = async (token,item)=>{
    let response =  await axios.post(`${URL}item/create`,{item},{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    return response.data;
};

const getAdminItems = async (token)=>{
       let response= await axios.get(`${URL}item/getAdminItems`,{
			headers:{
					'Authorization': `Bearer ${token}`
			}});
			
			return response.data;
};
const updateItem = async(token,item)=>{
    let response  =await axios.post(`${URL}item/update/${item._id}`,{item},{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    
    return response.data;
};

const deleteItem = async(token,payload)=>{
    let response  =await axios.post(`${URL}item/delete/${payload._id}`,payload,{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    
    return response.data;
};
const itemApi = {
    getItems: getItems,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem,
    getAdminItems
};
export default itemApi;