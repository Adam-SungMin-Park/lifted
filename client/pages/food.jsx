import React, { useState } from 'react';
import Chart from "chart.js";
import LineGraph3 from './linegraph3';

export default class Food extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isNew:true,
      userId:this.props.userId,
      createdAt:"",
      foods: [{
        food: "",
        calories: ""
      }],
      data:[],
      label:[]
    }
    this.chartRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleFoodName = this.handleFoodName.bind(this);
    this.handleCalories = this.handleCalories.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.foodReload = this.foodReload.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
   }

  componentDidMount(){
    fetch('/api/foods')
      .then(res => res.json())
      .then(res => {
        for (var i = 0 ; i < res.length ; i++){
          this.setState({
            data : this.state.data.concat(res[i].sum),
            label: this.state.label.concat(res[i].createdAt.slice(0,10).replaceAll("-","/"))
          })
        }
      })
      .catch(err => console.log(err))
  }

  handleSubmit() {
    if(this.state.isNew === true){
    fetch('/api/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => console.log(res))
      .then(data => console.log(data))
      .catch(err => console.log(err))
    alert('food saved!')
  }
  else{
    fetch('api/foods/update',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json)
      .then(data =>console.log(data))
      .catch(err => console.log(err))
      alert('food UPDATED')
  }
}

foodReload(){
  fetch('/api/foodsReload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state)
  })
    .then(res => res.json())
    .then(res => {
      if(res.length !==0){
        this.setState({
          foods:[]
        })
        console.log(res.length)
      for (var i = 0; i < res.length; i++) {
        this.setState({
          isNew:false,
          foods:this.state.foods.concat(res[i])
        })
      }}
      if(res.length === 0 ){
        console.log("no data here")
        this.setState({
          isNew:true,
          foods: [{
            food: "",
            calories: ""
          },
          ],
        })
      }
    }
  )
  }

  handleUpdateClick(index){
    console.log(index)
    fetch('/api/foods/update',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.foods[index])
    })
    .then(res =>console.log(res))
    .then(data =>console.log(data))
    .catch(err => console.log(err))
    alert("updated :)")
  }

  handleChangeDate(){
    this.setState({
      createdAt:event.target.value
    })
  }

  handleFoodName(e,index){
    let test = [...this.state.foods];
    let test2 = { ...this.state.foods[index] };
    test2.food = e.target.value
    test[index] = test2
    this.setState({
      foods: test
    })
  }

  handleCalories(e,index){

    let test = [...this.state.foods];
    let test2 = {...this.state.foods[index]};
    test2.calories = Number(e.target.value);
    test[index]=test2
    this.setState({
      foods:test
    })
  }

  handleRemoveClick(index) {
    console.log(event)
    event.preventDefault()
    const list = [...this.state.foods]
    console.log(list)
    list.splice(index, 1);
    this.setState({
      foods: list
    })
    fetch('/api/foods/delete',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.foods[index])
    })
    alert('good for diet')
  }

  handleAddClick(){
    event.preventDefault()
    const add =[{
      food: "",
      calories: ""
    }]
    const extraFood = this.state.foods.concat(add)
    this.setState({
      foods: extraFood
    })
  }

  render() {
    console.log(this.state)
    return (
      <div id="weightFoodContainer">
        <div id="weightFoodPageTitle">
          Food
        </div>
        <div id="caloriesGraphPlace">
          <div className="linegraph3">
          <LineGraph3
          data = {this.state.data}
          label = {this.state.label}
          />
          </div>
        </div>

          <form onSubmit = {this.foodReload} id ="dateForm">
            <div className="foodFoodDate">
              <input required onChange={this.handleChangeDate} type="date"></input>
            </div>
            <div className = "foodFoodDateButton">
              <button type ="submit">GO to this Date!</button>
            </div>
          </form>
        <form id="foodForm">
          {this.state.foods.map((foods, index) => {
            return(
              <div key={index} className = "foodCaloriesEntries">
                <div className = "foodCalories">
                  <div className ="foodNameInput">
                    <input required onChange={e => this.handleFoodName(e, index)} type="text"  value = {this.state.foods[index].food}></input>
                  </div>
                  <div className = "caloriesInput">
                    <input required onChange={e => this.handleCalories(e, index)} type="integer"  value={this.state.foods[index].calories}></input>
                  </div>
                </div>
                <div className = "updateOrRemove">
                  {this.state.foods.length !==1 && <button onClick ={()=>this.handleRemoveClick(index)} className = "removeButton">Remove</button>}
                  {this.state.foods.length !== 1 && <button onClick={() => this.handleUpdateClick(index)} className="updateButton">Update!</button>}
                </div>
              </div>
            )
          })}
          <div className = "extraFoodButton" >
            <button onClick = {this.handleAddClick}>Add!</button>
          </div>
          <div className = "submitFood">
            <a href="#user"onClick ={this.handleSubmit}>Save Foods!</a>
          </div>
        </form>
      </div>

    )
  }
}
