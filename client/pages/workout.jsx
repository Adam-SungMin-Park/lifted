import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph from './linegraph';

import App from '../app';
export default class WorkOut extends React.Component {

  constructor(props){
    super(props)
    this.state={
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
    console.log(event.target.value)
    this.setState({
      workOutPart: event.target.value
    })
    this.getData3();

  }

  getData3(){
    console.log(this.state.workOutPart)
    let dataArray = [];
    let labelArray = [];
    const allDataArray = [];
    const allLabelArray = [];
    for(var i = 0 ; i < this.state.allData.length; i++){
      if(event.target.value === this.state.allData[i].workOutPart){
        console.log('matching found')
        dataArray.push(this.state.allData[i].data);
        labelArray.push(this.state.allData[i].label);
        this.setState({
          data: dataArray,
          label: labelArray
        })
      }
      if(event.target.value === "Select WorkOut Part!"){
        allDataArray.push(this.state.allData[i].data)
        allLabelArray.push(this.state.allData[i].label);
        this.setState({
          data:allDataArray,
          label: allLabelArray
        })
      }

    }
  }


/*
  getData2() {
    console.log("firree")

    if (this.state.workOutPart !== "Select WorkOut Part!") {
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
          if (res.length !== 0) {
            for (var i = 0; i < res.length; i++) {
              dataArray.push(res[i].total_volume)
              labelArray.push(res[i].createdAt.slice(0, 10))
            }
            this.setState({
              data: dataArray,
              label: labelArray
            })
          }
          else {
            this.setState({
              data: this.state.data,
              label: this.state.label
            })
          }
        })

        .catch(err => { return err })

    }
    if (this.state.workOutPart === "Select WorkOut Part!") {
      this.getData()
    }

  }
*/
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
      .catch(error => this.setState({ error, isLoading: false }))
  }



  render(){
console.log(this.state)

return (

    <div id="workOutContainer">
      <div id = "workOutPageTitle">
        Workout Overview
      </div>
      <div id="homeWorkOutPartsDropDown">
        <select onChange={this.handleWorkOutPart}name="workoutParts" id="workOutPartsDropDown" value ={this.state.workOutPart}>
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
          Add Work Out
        </a>
      </div>
    </div>
  );
  }
}
