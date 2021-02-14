import React, { Component } from 'react'
import Chart from "chart.js";
import WorkOut from "./workout"


export default class LineGraph extends React.Component {
  constructor(props){
    super(props)
    this.chartRef = React.createRef();
  }

  componentDidUpdate(){

    var ctx = document.getElementById('myChart');
    var test = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "MY workout",
            data: this.props.data,
          }
        ]
      },
      options: {
      }
    });
  }

  render() {
   if(this.props.data.length ===0){
     return(
       <h1>Oh no workout record yet!</h1>
     )
   }
    return (
      <div className= "linegraph">
        <canvas
          id="myChart"
          ref={this.chartRef}
          data = {this.props.data}
          label ={this.props}
        />
      </div>
    )

}
}
