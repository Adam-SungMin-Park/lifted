import React, { Component } from 'react'
import Chart from "chart.js";
import Food from './food';


export default class LineGraph5 extends React.Component {
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
    const color = [];
    const color2 = [];
    for (var i = 0; i < this.props.data.length; i++) {
      color.push('rgb(40,127,62)')
    }

    var ctx_5 = document.getElementById('myChart5').getContext("2d");
    var test = new Chart(ctx_5, {
      type: "bar",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "Daily Calories intake (Kcal)",
            data: this.props.data,
            backgroundColor: color,
            order: 1
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
      <div className="linegraph5">
        <canvas
          id="myChart5"
          ref={this.chartRef}

        />
      </div>
    )

  }
}
