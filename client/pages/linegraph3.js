import React, { Component } from 'react'
import Chart from "chart.js";
import Food from './food';


export default class LineGraph2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      label: [],
    }
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    let calLength = this.props.data.length;
    let averageCal = 0;
    let averageCalArray = [];
    let totalCal = 0;
    for (var i = 0; i < this.props.data.length; i++) {
      console.log("checking line 22 : " + this.props.data[i])
      totalCal = totalCal + this.props.data[i]
    }
    let test2 = totalCal / calLength
    averageCal = test2.toPrecision(4);

    const color = [];
    const color2 = [];
    for (var i = 0; i < this.props.data.length; i++) {
      color.push('rgb(40,127,62)')
      color2.push('rgb(255,0,0)')
    }

    for (var i = 0; i < this.props.data.length; i++) {
      averageCalArray.push(averageCal)
    }




    var ctx_3 = document.getElementById('myChart3').getContext("2d");
    var test = new Chart(ctx_3, {
      type: "bar",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "Daily Calories intake",
            data: this.props.data,
            backgroundColor: color,
            order:1
          },
          {
            label: "Average : " + averageCalArray[0],
            data: averageCalArray,
            type: 'line',
            backgroundColor: "#FF0000",
            pointBackgroundColor: "#FF0000",
            pointBorderColor: "#FF0000",
            pointHoverBackgroundColor: "#FF0000",
            pointHoverBorderColor: "#FF0000",
            fill: false,
            borderColor: "#FF0000",
            order: 0
          }
        ]
      },
      options: {
        legend: {
          labels: {
            fontColor: 'rgb(40,127,62)'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
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

    return (
      <div className="linegraph3">
        <canvas
          id="myChart3"
          ref={this.chartRef}

        />
      </div>
    )

  }
}
