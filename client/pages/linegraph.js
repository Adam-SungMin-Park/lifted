import React, { Component } from 'react'
import Chart from "chart.js";
import WorkOut from "./workout"


export default class LineGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data:[],
      label:[],
    }
    //this.buildGraph = this.buildGraph.bind(this)
    this.chartRef = React.createRef();
  }

  componentDidUpdate(){
    console.log(this.chartRef)

    const myChartRef = this.chartRef.current.getContext("2d");

    var test = new Chart(myChartRef, {
      type: "line",
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
