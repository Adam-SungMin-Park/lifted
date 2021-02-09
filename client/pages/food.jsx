import React from 'react';
import LineGraph3 from './linegraph3';



export default class Food extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      food:"",
      createdAt:"",
      calories:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    fetch('/api/food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => this.buildGraph())
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div id="weightFoodContainer">
        <div id="weightFoodPageTitle">
          Food
        </div>
        <form onSubmit={this.handleSubmit} id="weightForm">
          <div className="weightFoodWeight">
            <input required onChange={this.handleChangeWeight} type="integer" placeholder="weight in kg,lbs or Kelvin"></input>
          </div>
          <div className="weightFoodDate">
            <input required onChange={this.handleChangeDate} type="date" placeholder="dd/mm/yy"></input>
          </div>
          <div className="addWeightButton">
            <button type="submit" >Save Weight!</button>
          </div>
        </form>
        <div id="caloriesGraphPlace">
          <LineGraph3
            date={[1,2,3]}
            weight={[1,2,3,4,5]}
          />
        </div>
        <div id="addFoodButton">
          <a href="#food"><button>Confess!</button></a>
        </div>
      </div>
    )
  }




}
