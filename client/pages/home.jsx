import React from 'react';
import { render } from 'react-dom';
import LineGraph from './linegraph'
import LineGraph2 from './linegraph2';


export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
      label:[],
      weigth:[],
      createdAt:[]
    }
    this.getData = this.getData.bind(this)
    //this.getData2 = this.getData2.bind(this)

  }
 /*getData2(){
    fetch('/api/weight')
      .then(res => res.json())
      .then(res => {
        const dateArray = [];
        const weightArray = [];
        for (var i = 0; i < res.length; i++) {
          dateArray.push(res[i].createdAt.slice(0, 10))
          weightArray.push(res[i].userWeight)
          this.setState({
            weight: weightArray,
            createdAt: dateArray
          })
        }
      })
      .catch(err => console.log(err))
    console.log(this.state)

  }*/

  getData() {
    fetch('/api/exercises')
    .then(res => res.json())
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          this.setState({
            data: this.state.data.concat(parseInt(res[i].total_volume)),
            label: this.state.label.concat(res[i].createdAt.slice(0, 10))
          })
        }
      }).then(

      )
      .catch(error => this.setState({ error, isLoading: false }))

      //this.getData2()

  }

  componentDidMount() {
    console.log(this.state)
    this.getData();
    //this.getData2();
  }


render(){
  return (
  <div id = "homeContainer">
    <div id = "homeWorkOutPartsDropDown">
      <select name ="workoutParts" id= "workOutPartsDropDown">
        <option value="placeHolder1">placeholder1</option>
        <option value="placeHolder2">placeholder2</option>
        <option value="placeHolder3">placeholder3</option>
      </select>
    </div>
    <a href = "#workout" id = "workOutGraphPlace">
      <LineGraph

      data = {this.state.data}
      label = {this.state.label}
      />
    </a>
    <div id = "homeWeightGraphPlace">
      <div>
        Weight
      </div>
      <a href = "#journal" id = "weightGraphPlace">
        <LineGraph2
          data={this.state.weight}
          label={this.state.createdAt}
        />
      </a>
    </div>
  </div>
  );
}
}
