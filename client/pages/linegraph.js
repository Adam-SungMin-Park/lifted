import React, { Component } from 'react'
import Chart from "chart.js";
import WorkOut from "./workout"


export default class LineGraph extends React.Component {

  constructor(props){
    super(props);
    /*this.state = {
      height:window.innerHeight,
      width:window.innerWidth
    }*/
    this.chartRef = React.createRef();
    //this.handleChange = this.handleChange.bind(this)
  }

  handleChange(){
    console.log(this.state);
    this.setState({
      height:window.innerHeight,
      width:window.innerWidth
    });
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
            borderWidth:0.1,
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
        events: ['click'],
        legend: {
          labels: {
            fontColor: 'rgb(40,127,62)'
          }
        },
        responsive:true,
        maintainAspectRatio: false,
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
      <div className= "wrapper" onChange ={console.log('he')}>
        <canvas
          className = "chartjs-render-monitor"
          id="myChart"
          ref={this.chartRef}
          data = {this.props.data}
          label ={this.props.label}
        />
      </div>
    )
}
}
