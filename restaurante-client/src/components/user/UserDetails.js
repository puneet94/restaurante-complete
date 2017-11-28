
import React from "react";
import {connect} from 'react-redux';

import {addUserDetails,fetchUserDetails} from "../../actions/user.js";
class UserDetailsComponent extends React.Component {
    componentWillMount = async ()=>{
        if(this.props.user.userId){
            await this.props.fetchUserDetails(this.props.user.userId);    
        }
        
    }
    onChange = (e) =>{
        this.props.addUserDetails(this.props.user.userId,{[e.target.name]: e.target.value});
    };
	renderUserForm = ()=>{
	    const user = this.props.user;
	    user.userPhone = user.userPhone || "";
	    return (
	            <div>
	                <div className={"userName detailsFormContainer"}>
	                    <label htmlFor="userName">Name</label>
                        <input
                            className={"userFormInput"}
                            type="text"
                            id="userName"
                            name="userName"
                            placeholder="Name"
                            value={user.userName}
                            onChange={this.onChange}
                         />
	                </div>
	                <div className={"userEmail detailsFormContainer"}>
	                    <label htmlFor="userEmail">Email</label>
                        <input
                        className={"userFormInput"}
                            type="text"
                            id="userEmail"
                            name="userEmail"
                            placeholder="email@example.com"
                            value={user.userEmail}
                            onChange={this.onChange}
                         />
	                </div>
	                <div className={"userPhone detailsFormContainer"}>
	                    <label htmlFor="userPhone">Phone</label>
                        <input
                        className={"userFormInput"}
                            type="tel"
                            id="userPhone"
                            name="userPhone"
                            placeholder="0123456789"
                            value={user.userPhone}
                            onChange={this.onChange}
                         />
	                </div>
	                <div className={"userNotes detailsFormContainer"}>
	                    <label htmlFor="userNotes">Notes</label>
                        <textarea
                        className={"userFormInput"}
                            rows="4" cols="20"
                            type="text"
                            id="userNotes"
                            name="userNotes"
                            placeholder="Add something like: No onions in salad"
                            value={user.userNotes}
                            onChange={this.onChange}
                         ></textarea>
	                </div>
	                <div className={"userTable detailsFormContainer"}>
	                    <label htmlFor="userTable">Table #</label>
                        <input
                        className={"userFormInput"}
                            type="text"
                            id="userTable"
                            name="userTable"
                            placeholder="Your table #"
                            value={user.userTable}
                            onChange={this.onChange}
                         />
	                </div>
	            </div>
	        );
	}
	render=()=>{
		return this.renderUserForm();
		
	}
}
const mapStateToProps=(state)=>{
	return {
		user: state.user
	};
};
export default connect(mapStateToProps,{addUserDetails,fetchUserDetails})(UserDetailsComponent);