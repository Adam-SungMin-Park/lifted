import React, { Component } from 'react'
import Chart, { annotation } from "chart.js";
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
    let weightLength =this.props.data.length;
    let averageWeight =0;
    let averageWeightArray=[];
    let totalWeight=0;
    for(var i =0 ; i < this.props.data.length ; i++){

      totalWeight = totalWeight + this.props.data[i]
    }
    let test2  = totalWeight / weightLength
    averageWeight = test2.toPrecision(4);

    for(var i = 0 ; i < this.props.data.length; i++){
      averageWeightArray.push(averageWeight)
    }
    console.log(averageWeightArray)
    const color = [];
    const color2 =[];
    for (var i = 0; i < this.props.data.length; i++) {
      color.push('rgb(40,127,62)')
      color2.push('rgb(255,0,0)')
    }

    var ctx_2 = document.getElementById('myChart2').getContext("2d");
    var test = new Chart(ctx_2, {
      type: "bar",
      data: {
        labels: this.props.label,
        datasets: [
          {
            label: "Weight",
            data: this.props.data,
            backgroundColor: color,
            order:1
          },
          {
            label : "Average : "+averageWeightArray[0],
            data: averageWeightArray,
            type:'line',
            backgroundColor: "#FF0000",
            pointBackgroundColor: "#FF0000",
            pointBorderColor: "#FF0000",
            pointHoverBackgroundColor: "#FF0000",
            pointHoverBorderColor: "#FF0000",
            fill: false,
            borderColor: "#FF0000",
            order:0
          }
        ]
      },
      options:{
        legend:{
          labels:{
            fontColor: 'rgb(40,127,62)'
          }
        },
        scales:{
          yAxes:[{
            ticks:{
              fontColor: 'rgb(40,127,62)'
            }
          }],
          xAxes:[{
            ticks:{
              fontColor: 'rgb(40,127,62)'
            }
          }]
        }
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
