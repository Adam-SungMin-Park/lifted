import React, { Component } from 'react';
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
    fetch('/api/exercises').then(res => res.json())
      .then(res => {
        for (var i=0 ; i < res.length;i++){
         this.setState({
           data: this.state.data.concat(parseInt(res[i].total_volume)),
           label : this.state.label.concat(res[i].createdAt.slice(0,10))
         })}
      })
      .catch(error => this.setState({ error, isLoading: false }))
  }

  componentDidMount(){
    this.getData();
  }

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
        <LineGraph
          data= {this.state.data}
          label = {this.state.label}
        />
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
