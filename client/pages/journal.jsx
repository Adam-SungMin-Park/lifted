import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph2 from './linegraph2';

import App from '../app';
export default class Journal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userId:999,
      weight:[],
      date:[],
      food:[{
        name:"",
        calories:""
      }]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleChangeWeight = this.handleChangeWeight.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.buildGraph = this.buildGraph.bind(this);

  }
  buildGraph(){
    fetch('/api/weight')
    .then(res => res.json())
      .then(res => {
        for(var i =0 ; i < res.length;i++){
        console.log(res[i].userWeight)

        }
      })
      .catch(err => console.log(err))
      console.log(this.state)

  };

  handleChangeWeight(){

    this.setState({
      weight: Number(event.target.value)
    })
  }
  handleChangeDate() {

    this.setState({
      date: event.target.value
    })
  }

  handleSubmit() {

    fetch('/api/weight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => this.buildGraph())
      .catch(err => console.log(err))




  }
  handleRemoveClick(index) {
    event.preventDefault()
    const list = [...this.state.exercise];
    list.splice(index, 1);
    this.setState({
      exercise: list
    })
  }

  handleAddClick(event) {

    event.preventDefault()
    const extraFood = this.state.food.concat(this.state.exercise[0])
    this.setState({
      exercise: extraExercise
    })
  }

  render(){
    console.log(this.state)


    return(
      <div id="weightFoodContainer">
        <div id="weightFoodPageTitle">
          Weight/Food
        </div>
        <form onSubmit = {this.handleSubmit} id="weightForm">
          <div className="weightFoodWeight">
          <input required onChange ={this.handleChangeWeight} type = "integer" placeholder = "weight in kg,lbs or Kelvin"></input>
          </div>
          <div className ="weightFoodDate">
            <input required onChange={this.handleChangeDate} type="date" placeholder="dd/mm/yy"></input>
          </div>
          <div className = "addWeightButton">
            <button type = "submit" >Save Weight!</button>
          </div>
        </form>
          <div id="caloriesGraphPlace">
          <LineGraph2
            date = {this.state.date}
            weight = {this.state.weight}
          />
          </div>
        </div>
    )}
}
