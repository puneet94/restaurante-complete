import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import deepFreeze from "deep-freeze";
const store = deepFreeze(createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
));
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App}>
                
            </Route>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
window.onbeforeunload = () => {
    const { orderItem } = store.getState();
    window.localStorage.setItem('orderItem',JSON.stringify(orderItem));
    
};
