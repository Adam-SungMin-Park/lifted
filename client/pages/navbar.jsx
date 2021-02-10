import React from 'react';
import { render } from 'react-dom';
//import WorkOut from './workout';
//import App from '../app';

export default class NavBar extends React.Component{

  render(){

  return (
    <div>
      <div id = "navBarContainer">
        <a className = "tab active" href = "#workout"><span className="material-icons md-60">fitness_center</span>Workout</a>
        <a className = "tab "href = "#routine"><span className="material-icons md-60">folder_special</span>Plans</a>
        <a className = "tab "href = "#journal"><span className="material-icons md-60">text_snippet</span>Journal</a>
        <a className = "tab "href = "#user"><span className="material-icons md-60">account_circle</span>User</a>
      </div>
      <div className = "signUpPlace">
      <a className="signUp" href="#signup">SignUp/SignIn</a>
      </div>
    </div>
  );
  }
}
