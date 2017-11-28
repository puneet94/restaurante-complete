import {GET_ITEMS,GET_CATEGORIES} from "../types.js";
import keyBy from "lodash/keyBy";
import keys from "lodash/keys";
import groupBy from "lodash/groupBy";

const INITIAL_STATE = {
	itemsHash: {
	},
	items:[],
	categories: [],
	categoryHash: {},
	categoryItemHash:{}
};
const item = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case GET_ITEMS:
            
            let itemsHashNew = keyBy(action.payload,(item)=>{
    			return ""+item._id;
    		});
    		let itemsNew = keys(itemsHashNew).filter((id)=>{
    			if(state.items.indexOf(id)===-1){
    				return true;
    			}else{
    				return false;
    			}
    		});
    		
    		
    		const categoryItemHash = groupBy(action.payload,"itemType.name");
    		
		    return {
		        ...state, 
		    itemsHash:{...state.itemsHash,...itemsHashNew},
		    items:[...state.items,...itemsNew],
		    categoryItemHash:{...state.categoryItemHash,...categoryItemHash} };
	    case GET_CATEGORIES:
	        
	        
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
            categoryHash:{...state.categoryHash,...categoryHashNew},
            categories:[...state.categories,...categoryNew] 
                
            };
        
        default:
            return state;
    }
};
export default item;