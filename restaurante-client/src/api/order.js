import axios from "axios";
import {URL} from "../types";

 const submitOrder = (order)=>{
    return axios.post(`${URL}order/create/`,{order,user:{name:"name1",phone:"123456789"}}).then((res)=>{
        return res.data;
    });
};
const orderApi = {
    submitOrder: submitOrder
};
export default orderApi;