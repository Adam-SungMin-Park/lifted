import React from 'react';
import AppContext from './app-context';
//import App from '../app';

export default class WorkOut extends React.Component {
  render(props){
  return (
    <div id="workOutContainer">
      <div id="workOutNavBar">
        <div id="navBarHome" onClick={this.props.handleClick}>
          <span class="material-icons md-60" >
            home
          </span>
        </div>
      </div>
      <div id = "workOutPage1Title">
        Workout Overview
      </div>
      <div id="workOutGraphPlace">
        <img id="workOutGraph" src="favicon.ico"></img>
      </div>
    </div>
  );
  }
}
WorkOut.contextType = AppContext
