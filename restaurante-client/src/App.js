import React, { Component } from 'react';
import {Route,Link} from "react-router-dom";


import './App.css';

import HomePageComponent from "./components/home/HomePage";
import OrderPageComponent from "./components/home/OrderPage";
import SummaryPageComponent from "./components/order/SummaryPage";
import AdminPageComponent from "./components/admin/AdminPage";
import UserOrders from "./components/user/UserOrders";
import {connect} from 'react-redux';

import {setUserDetails,fetchUserDetails} from "./actions/user.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      headerFixed:  false,
      openClass: false
    };
  }
  componentWillMount = async ()=>{
    if(this.props.user.userId){
      await this.props.fetchUserDetails(this.props.user.userId);    
    }else{
      await this.props.setUserDetails();
    }
        
  }
  componentDidMount = ()=>{
    window.onscroll = ()=> {
      /*if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
          this.setState({
            headerFixed: true
          });
      } else {
          
          this.setState({
            headerFixed: false
          });
      }*/
    };
  }
  render = ()=> {
    const {location} = this.props;
    return (
      <div className="App">
        {this.state.openClass&&<div className={"fixedSlider"}>
          <ul>
            <li onClick={()=>{this.setState({openClass:false});this.props.history.push("/")}}>Menu</li>
            <li onClick={()=>{this.setState({openClass:false});this.props.history.push("/userOrders")}}>MY ORDERS</li>
            
          </ul>
        </div>}
        <header className={"App-header  "+(this.state.headerFixed?"headerFixed whiteHeader ":" blackHeader ")}>
          <h1 className="App-title" onClick={()=>{this.setState({openClass:false});this.props.history.push("/")}}>MOOD</h1>
          <div id="nav-icon3" className={this.state.openClass?"open":""} onClick={()=>{this.setState({openClass:!this.state.openClass})}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </header>
        <div className="App-intro" style={{"paddingTop":(this.state.headerFixed?"60px":"70px")}}>
           <Route location={location} path="/" exact component={HomePageComponent} />
           <Route location = {location} path="/orderPage" exact component={OrderPageComponent}/>
           <Route location={location} path="/summary" exact component={SummaryPageComponent}/>
           <Route location={location} path="/admin"  component={AdminPageComponent}/>
           <Route location={location} path="/userOrders" exact component={UserOrders}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
	return {
		user: state.user
	};
};
export default connect(mapStateToProps,{setUserDetails,fetchUserDetails})(App);

