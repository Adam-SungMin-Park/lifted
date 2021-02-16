import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph4 from './linegraph4';

import App from '../app';
export default class Journal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      render:false,
      weight:[],
      date:[],
      data:[],
      userId: this.props.userId,
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
    this.handleSubmitDate = this.handleSubmitDate.bind(this);

    //this.buildGraph = this.buildGraph.bind(this);

  }

  componentDidMount(){
    fetch('/api/weight')
    .then(res => res.json())
      .then(res => {console.log(res)
        for (var i = 0; i < res.length; i++) {
          this.setState({
            weight: this.state.weight.concat(res[i].userWeight),
            date: this.state.date.concat(res[i].createdAt.slice(0, 10))
          })
      }
    })
      .catch(err => console.log("line 42 : " +err))
  };

  handleChangeWeight(){
    this.setState({
      weight:event.target.value
    })
  }

  handleSubmitWeight(){
    this.setState({
      weight: Number(event.target.value)
    })
  }
  handleChangeDate(e) {
    e.preventDefault()
    this.setState({
      date: event.target.value
    })
  }
  handleSubmitDate(e) {

    fetch('/api/weight/reload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res=>{
        if (res.length === 1) {
          console.log(res)
          console.log("weight : "+res.weight )
          this.setState({
            weight: res[0].weight,
            weightId: res[0].weightId,
            date: res[0].date
          })
        } else {
          console.log("must be a date without a weight...")
          this.setState({
            weight:""
          })
        }
      })


  }

  handleSubmit() {

    fetch('/api/weight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .catch(err => console.log(err))
      alert("weight saved!")
      this.setState({
        render : !this.state.render
      })
      this.componentDidMount()

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
          Weight Room
        </div>
        <div className="weightFoodDate">
          <input onChange={e =>this.handleChangeDate(e)} required type="date"></input>
          <div className="foodFoodDateButton">
            <button onClick={e=> this.handleSubmitDate(e)}>GO to this Date!</button>
          </div>
        </div>

          <div className="weightFoodWeight">
            <input onChange ={this.handleChangeWeight}  type = "integer" placeholder = "weight in kg or lbs" ></input>
          </div>
          <div className = "addWeightButton">
            <a href="#user" onClick={this.handleSubmit}><button type = "submit" >Save Weight!</button></a>
          </div>


          <div id="caloriesGraphPlace">
          <LineGraph4
            label = {this.state.date}
            data = {this.state.weight}
          />
          </div>
          <div id = "addFoodButton">
           <a href="#food"><button>Confess!</button></a>
          </div>
        </div>
    )}
}
