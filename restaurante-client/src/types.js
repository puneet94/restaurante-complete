
export const URL = process.env.NODE_ENV=='production'?"https://restaurante-complete.herokuapp.com/":"https://restaurante-imanjithreddy.c9users.io/"; 

export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const CREATE_ITEM = "CREATE_ITEM";
export const GET_ITEMS = "GET_ITEMS";
export const ADD_ORDER_ITEM = "ADD_ORDER_ITEM";
export const INCREMENT_ITEM_QUANTITY = "INCREMENT_ITEM_QUANTITY";
export const CHANGE_ITEM_QUANTITY = "CHANGE_ITEM_QUANTITY";
export const REMOVE_ORDER_ITEM = "REMOVE_ORDER_ITEM";
export const ADD_TOTAL_TO_ORDER = "ADD_TOTAL_TO_ORDER";
export const ADD_ITEMS_TO_ORDER = "ADD_ITEMS_TO_ORDER";
export const ORDER_RECEIVED = "ORDER_RECEIVED";
export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS";
export const FETCH_USER_ORDERS = "FETCH_USER_ORDERS";
export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_LOGOUT = "ADMIN_LOGOUT";
export const GET_ORDERS   = "GET_ORDERS";
export const SET_ORDERS_TYPE = "SET_ORDERS_TYPE";
export const UPDATE_ORDER_TYPE =  "UPDATE_ORDER_TYPE";
export const GET_ADMIN_CATEGORIES="GET_ADMIN_CATEGORIES";
export const GET_CATEGORIES="GET_CATEGORIES";
export const GET_ADMIN_ITEMS="GET_ADMIN_ITEMS";
export const UPDATE_CATEGORY="UPDATE_CATEGORY";
export const UPDATE_ITEM="UPDATE_ITEM";
export const DELETE_ITEM="DELETE_ITEM";