import React from 'react';
import Chart from "chart.js";
import LineGraph3 from './linegraph3';

export default class Food extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId:this.props.userId,
      createdAt:"",
      foods:[
        {
        food:"",
        calories:""
        },
      ],
      data:[],
      label:[],
      data2:[],
      label2:[]

    }
    this.chartRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleFoodName = this.handleFoodName.bind(this);
    this.handleCalories = this.handleCalories.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
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

    fetch('/api/weight')
      .then(res => res.json())
      .then(res => {
        const dateArray = [];
        const weightArray = [];
        for (var i = 0; i < res.length; i++) {
          dateArray.push(res[i].createdAt.slice(0, 10).replaceAll("-", "/"))
          weightArray.push(res[i].userWeight)
          this.setState({
            data2: weightArray,
            label2: dateArray
          })
        }
      })
      .catch(err => console.log(err))
    console.log(this.state)


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

  handleSubmit(){
    fetch('/api/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => console.log(res))
    .then(data => console.log(data))
      .catch(err => console.log(err))
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
  }

  handleAddClick(){
    event.preventDefault()
    const extraFood = this.state.foods.concat(this.state.foods[0])
    this.setState({
      foods: extraFood
    })

  console.log(this.state.foods)
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
          data2 = {this.state.data2}
          label2 = {this.state.label2}
          />
          </div>
        </div>
        <form  id="foodForm">
            <div className="foodFoodDate">
              <input required onChange={this.handleChangeDate} type="date"></input>
            </div>
          {this.state.foods.map((foods, index) => {
            return(
              <div key={index} className = "foodCaloriesEntries">
                <div className = "foodCalories">
                  <div className ="foodNameInput">
                    <input required onChange={e => this.handleFoodName(e, index)} type="text" placeholder="food name" value = {this.state.foods[index].name}></input>
                  </div>
                  <div className = "caloriesInput">
                    <input required onChange={e => this.handleCalories(e, index)} type="integer" placeholder="calories in number" value={this.state.foods[index].calories}></input>
                  </div>
                </div>
                <div className = "addOrRemove">
                  {this.state.foods.length !==1 && <button onClick ={()=>this.handleRemoveClick(index)} className = "removeButton">Remove</button>}
                </div>
              </div>
            )
          })}
          <div className = "extraFoodButton" >
            <button onClick = {this.handleAddClick}>Add!</button>
          </div>
          <div className = "submitFood">
            <a href = "#food" onClick ={this.handleSubmit}><button>Save Foods!</button></a>
          </div>
        </form>
      </div>

    )
  }




}
