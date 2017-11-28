
import React from "react";
import {connect} from 'react-redux';
import {adminLogin,adminLogout} from "../../actions/admin";
import {getItemTypes} from "../../actions/itemType";
import {getAdminItems} from "../../actions/item";
import {
  Link,Route,Redirect
} from 'react-router-dom';
import AdminOrders from "./AdminOrders";
import AdminItems from "./AdminItems";
import AdminCategories from "./AdminCategories";
class AdminPageComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			password:"",
			username: ""
		};
	}
	componentWillMount=async ()=>{
		await this.props.getAdminItems();
		await this.props.getItemTypes();
	}
	renderAdmin = ()=>{
	    return (
	        <div>
	            
	        </div>
	        );
	}
	onChange=(e)=>{
		this.setState({
			[e.target.name] : e.target.value
		});
	
	}

	render=()=>{
		if(this.props.authenticated){
			return (
				<div>
					<div style={{margin:"20px"}}>{"Hello admin"}	
					<button onClick={this.props.adminLogout}>Logout</button></div>
					<div className={"adminNavLinks"}>
					<Link to={"/admin/adminOrders"}>
        				Orders
        			</Link>
			        <Link to={"/admin/adminItems"}>
			          Items
			        </Link>
			        <Link to={"/admin/adminCategories"}>
			          Categories
			        </Link></div>
					<div className={"adminPanel"}>
						 {/*<Redirect to="/admin/adminOrders"/>*/}
						<Route  exact path="/admin/adminOrders" component={AdminOrders}/>
						<Route exact path="/admin/adminItems" component={AdminItems}/>
						<Route exact path="/admin/adminCategories" component={AdminCategories}/>
					</div>
					 
					
				</div>
				);
		}else{
			return (
					<div>
					<div className={["userName","detailsFormContainer"]}>
	                    <label htmlFor="username">Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="usename"
                            value={this.state.username}
                            onChange={this.onChange}
                         />
	                </div>
	                <div className={["userEmail","detailsFormContainer"]}>
	                    <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                         />
	                </div>
	                <button onClick={()=>{this.setState({username:"",password:""}); this.props.adminLogin({username:this.state.username,password:this.state.password})}}>Login</button>
					</div>
				);
		}
			
			
		
		
	}
}
const mapStateToProps=(state)=>{
	return {
		ordersHash: state.admin.ordersHash,
		authenticated: state.admin.authenticated,
		orders: state.admin.orders
		
	};
};
export default connect(mapStateToProps,{adminLogin,adminLogout,getItemTypes,getAdminItems})(AdminPageComponent);