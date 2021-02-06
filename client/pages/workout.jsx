import React from 'react';

//import App from '../app';
export default class WorkOut extends React.Component {
  render(){
  return (
    <div id="workOutContainer">
      <div id = "workOutPageTitle">
        Workout Overview
      </div>
      <div id="homeWorkOutPartsDropDown">
        <select name="workoutParts" id="workOutPartsDropDown">
          <option value="placeHolder1">placeholder1</option>
          <option value="placeHolder2">placeholder2</option>
          <option value="placeHolder3">placeholder3</option>
        </select>
      </div>
      <div id="workOutGraphPlace">
        <img id="workOutGraph" src="favicon.ico"></img>
      </div>
      <div id = "workOutAddButtonPlace">
        <a href= "#addworkout" id = "workOutAdd" >
          Add
        </a>
      </div>
    </div>
  );
  }
}
