import React from 'react';
import Chart from "chart.js";
import LineGraph from './linegraph';

import App from '../app';
export default class WorkOut extends React.Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      label:[]
    }
   this.getData = this.getData.bind(this)
  }

  getData(){
    fetch('/api/exercises').then(res => console.log(res.json()))
      .then(
        data =>
          this.setState({
            posts: data,
            isLoading: false
          })
      )
      .catch(error => this.setState({ error, isLoading: false }))
  }

  componentDidMount(){
    console.log(this.getData());
  }






/*{
  const dataArray = [];
  const labelArray = [];
  for (var i = 0; i < data.rows.length; i++) {
    dataArray.push(data.rows[i]["total volume"]);
    labelArray.push(data.rows[i].createdAt)
  }
  console.log("dataaaaa: " + dataArray)
  console.log("labeleeataaaaa: " + labelArray)
}*/


  render(){
//console.log(this.state)
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
        <LineGraph
        data = {this.state.data}
        labels = {this.state.label} />
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
