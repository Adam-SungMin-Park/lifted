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


    var ctx_3 = document.getElementById('myChart3').getContext("2d");
    var test = new Chart(ctx_3, {
      type: "bar",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "Daily Calories intake",
            data: this.props.data,
          }
        ]
      },
      options: {
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
