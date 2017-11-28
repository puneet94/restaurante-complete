import {ADMIN_LOGIN,ADMIN_LOGOUT,GET_ORDERS,SET_ORDERS_TYPE,UPDATE_ORDER_TYPE,
    GET_ADMIN_CATEGORIES,GET_ADMIN_ITEMS,UPDATE_CATEGORY,UPDATE_ITEM,DELETE_ITEM
} from "../types.js";
import keyBy from "lodash/keyBy";
import keys from "lodash/keys";
const INITIAL_STATE = {
	authenticated: false,
	token: "",
	ordersHash: {},
	orders:[],
	filteredOrders: [],
	ordersType: "",
	adminItems: [],
	adminItemsHash: {},
	categories : [],
	categoriesHash: {}
	
};
if(JSON.parse(window.localStorage.getItem('adminToken'))){
    INITIAL_STATE.authenticated = true;
    INITIAL_STATE.token = JSON.parse(window.localStorage.getItem('adminToken'));
}

const sliceArray = (inputArray,value)=>{
	const indexRemoved = inputArray.indexOf(value);
	if(indexRemoved>-1){
		const outputArray  = [...inputArray.slice(0,indexRemoved),...inputArray.slice(indexRemoved+1)];
		return outputArray;
	}else{
		return inputArray;
	}
	
};
const admin = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case ADMIN_LOGIN:
            const adminLoginState = {...state,authenticated:true,token:action.payload.token};
            console.log(adminLoginState);
            return adminLoginState;
        case ADMIN_LOGOUT:
            const adminLogoutState= {...state,authenticated:false,token:""};
            return adminLogoutState;
        case GET_ORDERS:
            const ordersHashNew = keyBy(action.payload,(order)=>{
    			return order._id;
    		});
    		const orders = keys(ordersHashNew);
            return {...state,ordersHash:{...state.ordersHash,...ordersHashNew},orders};
        case SET_ORDERS_TYPE:
            return {...state,ordersType:action.payload};
        case UPDATE_ORDER_TYPE:
            const orderItems = sliceArray(state.orders,action.payload);
            return {...state,orders:orderItems};
        case GET_ADMIN_CATEGORIES:
            let categoryHashNew = keyBy(action.payload,(item)=>{
    			return item._id;
    		});
    		let categoryNew = keys(categoryHashNew).filter((id)=>{
    			if(state.categories.indexOf(id)===-1){
    				return true;
    			}else{
    				return false;
    			}
    		});
            return {...state, 
            categoriesHash:{...state.categoriesHash,...categoryHashNew},
            categories:[...state.categories,...categoryNew] 
                
            };
            
        case GET_ADMIN_ITEMS:
            
            let itemsHashNew = keyBy(action.payload,(item)=>{
    			return item._id;
    		});
    		let adminItemsNew = keys(itemsHashNew).filter((id)=>{
    			if(state.adminItems.indexOf(id)===-1){
    				return true;
    			}else{
    				return false;
    			}
    		});
            return {...state, adminItemsHash:{...state.adminItemsHash,...itemsHashNew},adminItems:[...adminItemsNew,...state.adminItems] };
        case UPDATE_ITEM:
            const changedItem = action.payload;
            const oldItem = state.adminItemsHash[changedItem._id];
            const updatedItemsHash = {...state.adminItemsHash,[changedItem._id]:{...oldItem,...changedItem}};
            
            return {...state,adminItemsHash:{...updatedItemsHash}};
        case UPDATE_CATEGORY:
            const changedCategory = action.payload;
            const oldCategory = state.categoriesHash[changedCategory._id];
            const newcategoriesHash = {...state.categoriesHash,[changedCategory._id]:{...oldCategory,...changedCategory}};
            return {...state,categoriesHash:{...newcategoriesHash}};
            
        case DELETE_ITEM:
            const newItems = sliceArray(state.adminItems,action.payload);
            return {...state,adminItems:newItems};
        default:
            return state;
    }
};
export default admin;