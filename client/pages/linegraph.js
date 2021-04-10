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
            label: "Workout Volume (lbs)",
            data: this.props.data,
            backgroundColor:[
              'rgb(40,127,62)'
            ]
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },

        responsiveAnimationDuration: 0,
        events: ['click'],
        responsive: true,
        legend: {
          labels: {
            fontColor: 'rgb(40,127,62)'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: 'rgb(40,127,62)'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'rgb(40,127,62)'
            }
          }]
        }
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
window.addEventListener('resize', () => {
  window.location.reload();
})
