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
    var test = new Chart(ctx_2, {
      type: "bar",
      data: {
        labels: this.props.date,
        datasets: [
          {
            label: "MY workout",
            data: this.props.weight,
          }
        ]
      },
      options: {
      }
    });
  }

  render() {

    return (
      <div className="linegraph2">
        <canvas
          id="myChart3"
          ref={this.chartRef}

        />
      </div>
    )

  }
}
