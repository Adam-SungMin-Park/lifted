import React from 'react';
import { render } from 'react-dom';
//import WorkOut from './workout';
//import App from '../app';

export default class NavBar extends React.Component{

  constructor(props){

    super(props)
    this.state= {
      userId: this.props.userId
    }
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut(){
    console.log("signout fire")
    window.localStorage.removeItem("token")
    this.setState({
      userId: ""
    })
  }



  render(){
    console.log(this.props.userId)
    console.log(window.localStorage.getItem("token"))
    if(this.props.userId !=="" && this.props.userId !==null && this.props.userId !==undefined && window.localStorage.getItem("token")!==undefined){

  return (
    <div>
      <div id = "navBarContainer">
        <a className = "tab active" href = "#workout"><span className="material-icons md-60">fitness_center</span>Workout</a>
        <a className="tab " href="#food"><span className="material-icons md-60">restaurant_menu</span>Food</a>
        <a className = "tab "href = "#journal"><span className="material-icons md-60">text_snippet</span>Journal</a>
        <a className = "tab "href = "#user"><span className="material-icons md-60">account_circle</span>User</a>
      </div>
      <div className = "signUpPlace">
      <a className="signUp" href="#signup" onClick ={this.handleSignOut}>Hello User {this.props.userId} ! (Sign Out)</a>
      </div>
    </div>
  );
  }
  else{
    return (
      <div>
        <div id="navBarContainer">
          <a className="tab active" href="#workout"><span className="material-icons md-60">fitness_center</span>Workout</a>
          <a className="tab " href="#routine"><span className="material-icons md-60">folder_special</span>Plans</a>
          <a className="tab " href="#journal"><span className="material-icons md-60">text_snippet</span>Journal</a>
          <a className="tab " href="#user"><span className="material-icons md-60">account_circle</span>User</a>
        </div>
        <div className="signUpPlace">
          <a className="signUp" href="#signin" onClick={this.handleSignOut}>Sign Up or In</a>
        </div>
      </div>
    )
  }
}
}
