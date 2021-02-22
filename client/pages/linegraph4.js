import React, { Component } from 'react'
import Chart, { annotation } from "chart.js";
import Journal from './journal';


export default class LineGraph4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      label: [],
    }
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    let weightLength = this.props.data.length;
    let averageWeight = 0;
    let averageWeightArray = [];
    let totalWeight = 0;
    for (var i = 0; i < this.props.data.length; i++) {

      totalWeight = totalWeight + this.props.data[i]
    }
    averageWeight = totalWeight / weightLength


    for (var i = 0; i < this.props.data.length; i++) {
      averageWeightArray.push(averageWeight)
    }

    const color = [];
    const color2 = [];
    for (var i = 0; i < this.props.data.length; i++) {
      color.push('rgb(40,127,62)')
      color2.push('rgb(255,0,0)')
    }

    var ctx_4 = document.getElementById('myChart4').getContext("2d");
    var test = new Chart(ctx_4, {
      type: "bar",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "Weight (lbs)",
            data: this.props.data,
            backgroundColor: color
          },
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

    return (
      <div className="linegraph4">
        <canvas
          id="myChart4"
          ref={this.chartRef}

        />
      </div>
    )

  }
}
