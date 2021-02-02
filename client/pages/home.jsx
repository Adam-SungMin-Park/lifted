import React from 'react';

export default function Home(props) {
  return (
  <div id = "homeContainer">
    <div id = "homeWorkOutPartsDropDown">
      <select name ="workoutParts" id= "workOutPartsDropDown">
        <option value="placeHolder1">placeholder1</option>
        <option value="placeHolder2">placeholder2</option>
        <option value="placeHolder3">placeholder3</option>
      </select>
    </div>
    <div id = "workOutGraphPlace">
      <img id = "workOutGraph" src="favicon.ico"></img>
    </div>
    <div id = "homeWeightGraphPlace">
      <div>
        Weight
      </div>
      <img id = "workOutGraph" src="favicon.ico"></img>
    </div>
  </div>
  );
}
