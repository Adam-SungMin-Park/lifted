import React from 'react';
import { render } from 'react-dom';
import LineGraph from './linegraph'
import LineGraph2 from './linegraph2';
import LineGraph3 from './linegraph3';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userId:"",
      volume:[],
      label:[],
      weight:[],
      date:[],
      calories:[],
      caloriesDate:[]
    }
    this.getData = this.getData.bind(this)

  }

  getData() {
    fetch('/api/exercises')
    .then(res => res.json())
    .then(res => {
      for (var i = 0; i < res.length; i++) {
        this.setState({
          volume: this.state.volume.concat(parseInt(res[i].total_volume)),
          label: this.state.label.concat(res[i].createdAt.slice(0, 10))
        })
      }
      })
      .catch(error => this.setState({ error, isLoading: false }))

      fetch('/api/weight')
      .then(res => res.json())
      .then(res => {
        for (var i = 0 ; i < res.length ; i ++){
          this.setState({
            weight : this.state.weight.concat(parseInt(res[i].userWeight)),
            date : this.state.date.concat(res[i].createdAt.slice(0,10))
          })
        }
      })

      fetch('/api/foods')
      .then(res=>res.json())
      .then(res =>{
        for(var i = 0 ; i < res.length ; i++){
          this.setState({
            calories:this.state.calories.concat(parseInt(res[i].sum)),
            caloriesDate : this.state.caloriesDate.concat(res[i].createdAt.slice(0,10))
          })
        }
      })
  }


  componentDidMount() {

    this.getData();
  }


render(){

  if(this.state.volume.length !== 0){
  return (
  <div id = "homeContainer">

      <div className = "homeWorkoutGraph">
        <div className = "homeWorkOutTitle">
          Work Out Volume
        </div>
      </div>
    <a href = "#workout" id = "workOutGraphPlace">
      <LineGraph
      data = {this.state.volume}
      label = {this.state.label}
      />
    </a>
    <div id = "homeWeightGraphPlace">
      <div>
        Weight
      </div>
      <a href = "#journal" id = "weightGraphPlace">
        <LineGraph2
            data = {this.state.weight}
            label={this.state.date}
            />
      </a>
    </div>
      <div id="homeFoodGraphPlace">
        <div>
          Food Consumption
      </div>
        <a href="#food" id="foodGraphPlace">
          <LineGraph3
            data={this.state.calories}
            label={this.state.caloriesDate}
          />
        </a>
      </div>
  </div>
  );
  }
  else{
    return (
      <div id="homeContainer">
        <div className="signUpPlace">
          <a className="signUp" href="#signin" >Sign Up or In</a>
        </div>
        <div id="homeWorkOutPartsDropDown">
          <select name="workoutPart" id="workOutPartDropDown">
            <option value="placeHolder1">placeholder1</option>
            <option value="placeHolder2">placeholder2</option>
            <option value="placeHolder3">placeholder3</option>
          </select>
        </div>
      </div>
    )
  }

}
}
