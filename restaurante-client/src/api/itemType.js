import axios from "axios";
import {URL} from "../types";

 const createItemType = async (token,itemType)=>{
     
    let response =  await axios.post(`${URL}itemType/create`,{itemType},{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    
    return response.data;
};

const getItemTypes = async (token)=>{
       let response= await axios.get(`${URL}itemType/getItemTypes`,{
			headers:{
					'Authorization': `Bearer ${token}`
			}});
			return response.data;
};
const updateItemType = async(token,itemType)=>{
    let response  =await axios.post(`${URL}itemType/update/${itemType._id}`,{itemType},{
        headers:{
					'Authorization': `Bearer ${token}`
			}
    });
    
    return response.data;
};
const itemTypeApi = {
    getItemTypes: getItemTypes,
    createItemType: createItemType,
    updateItemType: updateItemType,
    
};
export default itemTypeApi;