import {ADD_USER_DETAILS} from "../types.js";
//import keyBy from "lodash/keyBy";
//import keys from "lodash/keys";
const INITIAL_STATE = {
	userEmail: "",
	userName: "",
	userNotes:"",
	userPhone: "",
	userTable: "",
	userId: "",
	userToken: "",
	orders: []
};

if(JSON.parse(window.localStorage.getItem('userId'))){
    INITIAL_STATE.userId = JSON.parse(window.localStorage.getItem('userId'));
}
if(JSON.parse(window.localStorage.getItem('userToken'))){
    INITIAL_STATE.userToken = JSON.parse(window.localStorage.getItem('userToken'));
}
const order = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case ADD_USER_DETAILS:
            const newUserState =  {...state,...action.payload};
            return newUserState;
        
        default:
            return state;
    }
};
export default order;