import React, { Component } from 'react'
import Chart from "chart.js";
import Food from './food';


export default class LineGraph3 extends React.Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    console.log(this.props)
    let calLength = this.props.data.length;
    let averageCal = 0;
    let averageCalArray = [];
    let totalCal = 0;
    for (var i = 0; i < this.props.data.length; i++) {

      totalCal = totalCal + parseInt(this.props.data[i])

    }
    let test2 = totalCal / calLength
    console.log(test2)

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

    var ctx_3 = document.getElementById('myChart3')
    var test = new Chart(ctx_3, {
      type: "bar",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "Daily Calories intake (Kcal)",
            data: this.props.data,
            backgroundColor: color,
            order:1
          },
          {
            label: "Average : " + averageCal,
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
    if (this.props.data.length === 0) {
      return (
        <h1>No calories record found!</h1>
      )
    }
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
