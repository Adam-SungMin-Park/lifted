import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph from './linegraph';
import App from '../app';
import { render } from 'react-dom';


export default class WorkOut extends React.Component {

  constructor(props){
    super(props)
    this.state={
      userId:this.props.userId,
      allData:[
        {
          data:[],
          label:[],
          workOutPart:[]
        },
      ],
      data:[],
      label:[],
      userId:this.props.userId,
      workOutPart:""
    }
   this.getData = this.getData.bind(this);
   this.getData3 = this.getData3.bind(this);
   this.handleWorkOutPart = this.handleWorkOutPart.bind(this);
  }

  handleWorkOutPart() {
    this.setState({
      workOutPart: event.target.value
    })
    this.getData3();

  }

  getData3(){
    let dataArray = [];
    let labelArray = [];
    const allDataArray = [];
    const allLabelArray = [];
    for(var i = 0 ; i < this.state.allData.length; i++){
      if(event.target.value === this.state.allData[i].workOutPart){
        dataArray.push(this.state.allData[i].data);
        labelArray.push(this.state.allData[i].label);
        this.setState({
          data: dataArray,
          label: labelArray
        })
      }
      if(event.target.value === "Select Workout Part!"){
        allDataArray.push(this.state.allData[i].data)
        allLabelArray.push(this.state.allData[i].label);
        this.setState({
          data:allDataArray,
          label: allLabelArray
        })
      }

    }
  }
  componentDidMount() {
    this.getData();

  }
  getData(){
    fetch('/api/exercises').then(res => res.json())
      .then(res => {
        for (var i=0 ; i < res.length;i++){

          let test = {};
          test.data = parseInt(res[i].total_volume)
          test.label = res[i].createdAt.slice(0,10)
          test.workOutPart = res[i].workOutPart

         this.setState({
           allData: this.state.allData.concat(test).slice(0,15),
           data: this.state.data.concat(parseInt(res[i].total_volume)),
           label : this.state.label.concat(res[i].createdAt.slice(0,10))
         })}
      })
      .catch(error => {return(error)})
  }



  render(){

  return (
    <div className="wrapper" onChange ={console.log('hihi')}>
      <div id = "workOutPageTitle">
        Workout Overview
      </div>
      <div id="homeWorkOutPartsDropDown">
        <select onChange={this.handleWorkOutPart}name="workoutParts" id="workOutPartsDropDown" value ={this.state.workOutPart}>
          <option>Select Workout Part!</option>
          <option value="Chest">Chest</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Full Body">Full Body</option>
          <option value="Push">Push</option>
          <option value="Pull">Pull</option>
        </select>
        <div className="foodFoodDateButton">
        </div>
      </div>

          <LineGraph
            data= {this.state.data}
            label = {this.state.label}
          />

      <div id = "workOutAddButtonPlace">
        <a href= "#addworkout" id = "workOutAdd" >
          Add Workout
        </a>
      </div>
    </div>



  );
  }
}
