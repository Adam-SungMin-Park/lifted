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
    .then(res => { let volumeArray = []; let labelArray=[];
     for (var i = 0; i < res.length; i++) {
       volumeArray.push(parseInt(res[i].total_volume));
       labelArray.push(res[i].createdAt.slice(0, 10))
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
        for (var i = 0; i < res.length; i++) {
          this.setState({
            weight: this.state.weight.concat(parseInt(res[i].userWeight)),
            date: this.state.date.concat(res[i].createdAt.slice(0, 10))
          })
        }
      })
      .catch(error => this.setState({ error, isLoading: false }))

    fetch('/api/foods')
      .then(res => res.json())
      .then(res => {
        let caloriesArray = [];
        let dateArray = [];
        for (var i = 0; i < res.length; i++) {
          caloriesArray.push(parseInt(res[i].sum))
          dateArray.push(res[i].createdAt.slice(0, 10))
          this.setState({
            calories: this.state.calories.concat(parseInt(res[i].sum)),
            caloriesDate: this.state.caloriesDate.concat(res[i].createdAt.slice(0, 10))
          })
        }

      })
      .catch(error => this.setState({ error, isLoading: false }))
  }


  componentDidMount() {
    this.getData();
  }


render(){
  return (
  <div id = "homeContainer">
      <div className = "homeWorkoutGraph">
        <div className = "homeWorkOutTitle">
          Work Out Volume
        </div>
      </div>

    <a href = "#workout" id = "workOutGraphPlace">
      <div className = "homeWorkOutGraph">
        <LineGraph
        data = {this.state.volume}
        label = {this.state.label}
        />
      </div>
    </a>

    <div id = "homeWeightGraphPlace">
      <div>
        Weight
      </div>

      <a href = "#journal" id = "weightGraphPlace">
        <div className ="homeWeightGraph">
          <LineGraph2
            data={this.state.volume}
            label={this.state.label}
          />
        </div>
      </a>
    </div>

      <div id="homeFoodGraphPlace">
        <div>
          Food Consumption
        </div>
        <a href="#food" id="foodGraphPlace">
          <div className="homeCalGraph">
          <LineGraph3
            data={this.state.volume}
            label={this.state.label}
          />
          </div>
        </a>
      </div>
  </div>
  );
  }
}
