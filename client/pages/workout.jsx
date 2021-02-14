import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph from './linegraph';

import App from '../app';
export default class WorkOut extends React.Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      label:[],
      userId:this.props.userId,
      workOutPart:""
    }
   this.getData = this.getData.bind(this);
   this.handleWorkOutPart = this.handleWorkOutPart.bind(this);
    this.handlePartSubmit = this.handlePartSubmit.bind(this);
  }


  handlePartSubmit(){
    fetch('/api/workOutPart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => {
        const dataArray = [];
        const labelArray = [];
      for(var i = 0 ; i < res.length ; i++){
        dataArray.push(res[i].total_volume)
        labelArray.push(res[i].createdAt.slice(0,10))
      }
        this.setState({
          data: dataArray,
          label: labelArray
        })
      })
      .catch(err => console.log(err))

  }
  handleWorkOutPart(){
    this.setState({
      workOutPart: event.target.value
    })
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
    console.log(this.state)
  return (

    <div id="workOutContainer">
      <div id = "workOutPageTitle">
        Workout Overview
      </div>
      <div id="homeWorkOutPartsDropDown">
        <select onChange ={this.handleWorkOutPart}name="workoutParts" id="workOutPartsDropDown">
          <option>Select WorkOut Part!</option>
          <option value="Chest">Chest</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Full Body">Full Body</option>
          <option value="Push">Push</option>
          <option value="Pull">Pull</option>
        </select>
        <div className="foodFoodDateButton">
          <button onClick={this.handlePartSubmit} type="submit">This Work Out Part!</button>
        </div>
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
