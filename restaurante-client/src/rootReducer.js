import {combineReducers} from "redux";
import user from "./reducers/user";
import item from "./reducers/item";
import order from "./reducers/order";
import admin from "./reducers/admin";
import orderItem from "./reducers/orderItem";

export default combineReducers({
    user,
    item,
    order,
    orderItem,
    admin
});