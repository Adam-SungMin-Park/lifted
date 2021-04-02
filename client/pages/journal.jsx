import React, { Component } from 'react';
import Chart from "chart.js";
import LineGraph2 from './linegraph2';

import App from '../app';
export default class Journal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      date:[],
      weightData:[],
      dateData:[],
      weight:"",
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
    this.handleUpdate = this.handleUpdate.bind(this);
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
      .catch(err => {return err})
  };

  handleChangeWeight(){
    this.setState({
      weight:Number(event.target.value)
    })
  }

  handleSubmitWeight(){
    this.setState({
      weight: Number(event.target.value)
    })
  }
  handleChangeDate(e) {

    e.preventDefault();
    let test = [];
    test[0]=  e.target.value;
   if(this.state.dateData.length === 0) {
     this.setState({
       weight: "",
       weightId: "",
       date: [e.target.value]
     })
   }

    for(var i = 0 ; i < this.state.dateData.length; i++){
        if(test[0] === this.state.dateData[i]){
          fetch('/api/weight/reload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(test)
          })
            .then(res => res.json())
            .then(res => {
                this.setState({
                  date: [e.target.value],
                  weightId: Number(res[0].weightId)
                })
            })
          this.setState({
            weight:parseInt(this.state.weightData[i])
          })
        }
        if(!this.state.dateData.includes(test[0])){

          this.setState({
            weight:"",
            weightId:"",
            date:[e.target.value]
          })
        }
    }

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
      .catch(err => { return err })

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
      if (this.state.date !== "" && this.state.weight !== "" && this.state.weightId !== "" ){
        return (
          <div id="weightFoodContainer">
            <div id="weightFoodPageTitle">
              Weight Room
        </div>
            <div className="weightFoodDate">
              <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
            </div>

            <div className="weightFoodWeight">
              <input onChange={this.handleChangeWeight} type="integer" placeholder="weight in lbs" value={this.state.weight} ></input>
            </div>
            <div className="addWeightButton">
              <a href="#workout" onClick={this.handleUpdate}><button type="submit" >Update Weight!</button></a>
            </div>


            <div id="caloriesGraphPlace">
              <LineGraph2
                label={this.state.dateData}
                data={this.state.weightData}
              />
            </div>

          </div>
        )
      }
    }
    if (this.state.date !== "" && this.state.dateData.length !==0 && this.state.weightId ===""){
    return(
      <div id="weightFoodContainer">
        <div id="weightFoodPageTitle">
          Weight Room
        </div>
        <div className="weightFoodDate">
          <input onChange={e =>this.handleChangeDate(e)} required type="date"></input>

        </div>

          <div className="weightFoodWeight">
            <input onChange ={this.handleChangeWeight}  type = "number" placeholder = "weight in lbs" value ={this.state.weight} ></input>
          </div>
          <div className = "addWeightButton">
            <a href="#workout" onClick={this.handleSubmit}><button type = "submit" >Save Weight!</button></a>
          </div>


          <div id="caloriesGraphPlace">
            <LineGraph2
              label={this.state.dateData}
              data={this.state.weightData}
            />
          </div>
        </div>
    )}
    if(this.state.dateData.length === 0 ){
      return (
        <div id="weightFoodContainer">
          <div id="weightFoodPageTitle">
            Weight Room
        </div>
          <div className="weightFoodDate">
            <input onChange={e => this.handleChangeDate(e)} required type="date"></input>

          </div>
          <div className="weightFoodWeight">
            <input onChange={this.handleChangeWeight} type="number" placeholder="weight in lbs" value={this.state.weight} ></input>
          </div>
          <div className="addWeightButton">
            <a href="#workout" onClick={this.handleSubmit}><button type="submit" >Save Weight!</button></a>
          </div>
          </div>
      )
    }


  }
}
