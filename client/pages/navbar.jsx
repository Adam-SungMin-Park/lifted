import React from 'react';
import { render } from 'react-dom';
import WorkOut from './workout';
import AppContext from './app-context';
//import App from '../app';

export default class NavBar extends React.Component{

  render(props){

  return (
    <div>
      <div id = "navBarContainer">
        <div id = "navBarWorkOut" onClick = {this.props.handleClick}>
          <span class="material-icons md-60">
            fitness_center
          </span>
          <div id = "navBarText">
            Workout
          </div>
        </div>
        <div id="navBarPlans" onClick={this.props.handleClick}>
          <span class="material-icons md-60">
            folder_special
          </span>
          <div id ="navBarText">
            Plans
          </div>
        </div>
        <div id="navBarJournal" onClick={this.props.handleClick}>
          <span class="material-icons md-60">
            text_snippet
          </span>
          <div id="navBarText">
            Journal
          </div>
        </div>
        <div id="navBarUser" onClick={this.props.handleClick}>
          <span class="material-icons md-60">
            account_circle
          </span>
          <div id="navBarText">
            User
          </div>
        </div>
      </div>
    </div>
  );
  }
}
NavBar.contextType = AppContext
