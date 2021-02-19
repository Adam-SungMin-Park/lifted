import React, { useState } from 'react';
import Chart from "chart.js";
import LineGraph5 from './linegraph5';

export default class Food extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      userId:this.props.userId,
      createdAt:"",
      foods: [{
        food: "",
        calories: ""
      }],
      newFoods:[{
        food:"",
        calories:""
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
    this.handleNewFoodName = this.handleNewFoodName.bind(this);
    this.handleNewFoodCalories = this.handleNewFoodCalories.bind(this);
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
    fetch('/api/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => (res))
      .then(data => (data))
      .catch(err => console.log(err))

}

foodReload(event){
  event.preventDefault();
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
      let foodsArray =[];

      for (var i = 0; i < res.length; i++) {
        foodsArray.push(res[i]);
      }
      this.setState({
        foods:foodsArray
      })
    }

      if(res.length === 0 ){

        this.setState({
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

    fetch('/api/foods/update',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.foods[index])
    })
    .then(res =>(res))
    .then(data =>(data))
    .catch(err => console.log(err))

  }

  handleChangeDate(){
    this.setState({
      createdAt:event.target.value
    })
  }

  handleNewFoodName(e,index){
    let test = [...this.state.newFoods];
    let test2 = { ...this.state.newFoods[index] };
    test2.food = e.target.value
    test[index] = test2
    this.setState({
      newFoods: test
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
  handleNewFoodCalories(e,index){
    let testing = [...this.state.newFoods];
    let testing2 = { ...this.state.newFoods[index] };
    testing2.calories = Number(e.target.value);
    testing[index] = testing2;
    this.setState({
      newFoods: testing
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

    event.preventDefault()
    const list = [...this.state.foods]

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

  }

  handleAddClick(){
    event.preventDefault()
    const add =[{
      food: "",
      calories: ""
    }]
    const extraFood = this.state.newFoods.concat(add)
    this.setState({
      newFoods: extraFood
    })
  }

  render() {

    if(this.state.createdAt === ""){
      return (
        <div id="weightFoodContainer">
          <div id="weightFoodPageTitle">
            Food
        </div>
          <div id="caloriesGraphPlace">
            <div className="linegraph3">
              <LineGraph5
                data={this.state.data}
                label={this.state.label}
              />
            </div>
          </div>
          <form onSubmit={this.foodReload} id="dateForm">
            <div className="foodFoodDate">
              <input required onChange={this.handleChangeDate} type="date"></input>
            </div>
            <div className="foodFoodDateButton">
              <button type="submit">GO to this Date!</button>
            </div>
          </form>
        </div>
      )
    }
    if(this.state.foods[0].food === "" && this.state.createdAt !== ""){
      return(
        <div id="weightFoodContainer">
          <div id="weightFoodPageTitle">
            Food
        </div>
          <div id="caloriesGraphPlace">
            <div className="linegraph3">
              <LineGraph5
                data={this.state.data}
                label={this.state.label}
              />
            </div>
          </div>
          <form onSubmit={(event)=>this.foodReload(event)} id="dateForm">
            <div className="foodFoodDate">
              <input required onChange={this.handleChangeDate} type="date"></input>
            </div>
            <div className="foodFoodDateButton">
              <button type="submit">GO to this Date!</button>
            </div>
          </form>
          <form id="foodForm">

            {this.state.newFoods.map((food, index) => {
              return (
                <div key={index} className="foodCaloriesEntries">
                  <div className="foodCalories">
                    <div className="foodNameInput">
                      <input id="newFoodsName" required onChange={e => this.handleNewFoodName(e, index)} type="text" placeholder="food" value={this.state.newFoods[index].food}></input>
                    </div>
                    <div className="caloriesInput">
                      <input id="newFoodsCalories" required onChange={e => this.handleNewFoodCalories(e, index)} type="integer" placeholder="calories" value={this.state.newFoods[index].calories}></input>
                    </div>
                  </div>
                  <div className="updateOrRemove">
                    {this.state.newFoods.length > 1 && <button onClick={() => this.handleRemoveClick(index)} className="removeButton">Remove</button>}
                    {this.state.newFoods.length !== 0 && <button onClick={() => this.handleUpdateClick(index)} className="updateButton">Update!</button>}
                  </div>
                </div>
              )
            })}
            <div className="extraFoodButton" >
              <button onClick={this.handleAddClick}>Add!</button>
            </div>
            <div className="submitFood">
              <a className ="saveFoodsButton" href="#user" onClick={this.handleSubmit}>Save Foods!</a>
            </div>
          </form>
        </div>
      )
    }
  if(this.state.foods[0].food !== "" && this.state.createdAt !=="") {
    return (
      <div id="weightFoodContainer">
        <div id="weightFoodPageTitle">
          Food
        </div>
        <div id="caloriesGraphPlace">
          <div className="linegraph3">
          <LineGraph5
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
        {this.state.foods.map((food, index) => {
          return (
            <div key={index} className="foodCaloriesEntries">
              <div className="foodCalories">
                <div className="foodNameInput">
                  <input  required onChange={e => this.handleFoodName(e, index)} type="text" placeholder="food" value={this.state.foods[index].food}></input>
                </div>
                <div className="caloriesInput">
                  <input  required onChange={e => this.handleCalories(e, index)} type="integer" placeholder="calories" value={this.state.foods[index].calories}></input>
                </div>
              </div>
              <div className="updateOrRemove">
                {this.state.foods.length > 1 && <button onClick={() => this.handleRemoveClick(index)} className="removeButton">Remove</button>}
                {this.state.foods.length !== 0 && <button onClick={() => this.handleUpdateClick(index)} className="updateButton">Update!</button>}
              </div>

            </div>
          )
        })
        }
        <form id="foodForm">

        {this.state.newFoods.map((food, index) => {
          return (
            <div key={index} className="foodCaloriesEntries">
              <div className="foodCalories">
                <div className="foodNameInput">
                  <input id="newFoodsName" required onChange={e => this.handleNewFoodName(e, index)} type="text" placeholder="food" value={this.state.newFoods[index].food}></input>
                </div>
                <div className="caloriesInput">
                  <input id="newFoodsCalories" required onChange={e => this.handleNewFoodCalories(e, index)} type="integer" placeholder="calories" value={this.state.newFoods[index].calories}></input>
                </div>
              </div>
              <div className="updateOrRemove">
                {this.state.newFoods.length > 1 && <button onClick={() => this.handleRemoveClick(index)} className="removeButton">Remove</button>}
                {this.state.newFoods.length !== 0 && <button onClick={() => this.handleUpdateClick(index)} className="updateButton">Update!</button>}
              </div>
              <div className="extraFoodButton" >
                <button onClick={this.handleAddClick}>Add!</button>
              </div>
              <div className="submitFood">
                <a href="#user" onClick={this.handleSubmit}>Save Foods!</a>
              </div>
            </div>
            )
          })
        }
    </form>
    </div>
  )
  }
}}
