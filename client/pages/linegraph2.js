import React, { Component } from 'react'
import Chart from "chart.js";
import Journal from './journal';


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


    var ctx_2 = document.getElementById('myChart2').getContext("2d");
    var test = new Chart(ctx_2, {
      type: "bar",
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

    return (
      <div className="linegraph2">
        <canvas
          id="myChart2"
          ref={this.chartRef}

        />
      </div>
    )

  }
}
