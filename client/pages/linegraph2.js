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

  componentDidMount() {
    console.log(this.chartRef)

    const myChartRef = this.chartRef.current.getContext("2d");

    var test = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: [1,2,3],
        datasets: [
          {
            label: "MY workout",
            data: [1,2,3],
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
          id="myChart"
          ref={this.chartRef}

        />
      </div>
    )

  }
}
