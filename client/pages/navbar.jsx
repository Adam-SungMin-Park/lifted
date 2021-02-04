import React from 'react';
import { render } from 'react-dom';
//import WorkOut from './workout';
//import App from '../app';

export default class NavBar extends React.Component{

  render(props){

  return (
    <div>
      <div id = "navBarContainer">


        <a class = "tab active" href = "#workout"><span class="material-icons md-60">fitness_center</span>Workout</a>
        <a class = "tab "href = "#routine"><span class="material-icons md-60">folder_special</span>Plans</a>
        <a class = "tab "href = "#journal"><span class="material-icons md-60">text_snippet</span>Journal</a>
        <a class = "tab "href = "#user"><span class="material-icons md-60">account_circle</span>User</a>

      </div>
    </div>
  );
  }
}
