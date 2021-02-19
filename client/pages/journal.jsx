import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph4 from './linegraph4';

import App from '../app';
export default class Journal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      render:false,
      date:[],
      weightData:[],
      dateData:[],
      weight:[],
      weightId:"",
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
    this.handleUpdate = this.handleUpdate.bind(this);

    //this.buildGraph = this.buildGraph.bind(this);

  }

  componentDidMount(){
    fetch('/api/weight')
    .then(res => res.json())
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          this.setState({
            weightData: this.state.weightData.concat(res[i].userWeight),
            dateData: this.state.dateData.concat(res[i].createdAt.slice(0, 10))
          })
      }
    })
      .catch(err => console.log(err))
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
          this.setState({
            weight: res[0].weight,
            weightId: res[0].weightId,
            date: res[0].date
          })
        } else {
          this.setState({
            weight:""
          })
        }
      })


  }
  handleUpdate(){
    fetch('/api/weight/update', {
      method:'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(this.state)
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

    for(var i = 0 ; i < this.state.dateData.length ; i++){
      if (this.state.date !== "" && this.state.date.slice(0, 10) === this.state.dateData[i]){
        return (
          <div id="weightFoodContainer">
            <div id="weightFoodPageTitle">
              Weight Room
        </div>
            <div className="weightFoodDate">
              <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
              <div className="foodFoodDateButton">
                <button onClick={e => this.handleSubmitDate(e)}>GO to this Date!</button>
              </div>
            </div>

            <div className="weightFoodWeight">
              <input onChange={this.handleChangeWeight} type="integer" placeholder="weight in lbs" value={this.state.weight} ></input>
            </div>
            <div className="addWeightButton">
              <a href="#user" onClick={this.handleUpdate}><button type="submit" >Update Weight!</button></a>
            </div>


            <div id="caloriesGraphPlace">
              <LineGraph4
                label={this.state.dateData}
                data={this.state.weightData}
              />
            </div>
            <div id="addFoodButton">
              <a href="#food"><button>Confess!</button></a>
            </div>
          </div>
        )
      }
    }
    if (this.state.date !== "" && this.state.date.slice(0, 10) !== this.state.dateData[i]){
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
            <input onChange ={this.handleChangeWeight}  type = "integer" placeholder = "weight in lbs" value ={this.state.weight} ></input>
          </div>
          <div className = "addWeightButton">
            <a href="#user" onClick={this.handleSubmit}><button type = "submit" >Save Weight!</button></a>
          </div>


          <div id="caloriesGraphPlace">
          <LineGraph4
            label = {this.state.dateData}
            data = {this.state.weightData}
          />
          </div>
          <div id = "addFoodButton">
           <a href="#food"><button>Confess!</button></a>
          </div>
        </div>
    )}

  }
}
