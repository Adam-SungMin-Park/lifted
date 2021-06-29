import React, { useEffect } from 'react'
import Chart from "chart.js";
import WorkOut from "./workout"


export default function LineGraph (props) {

  const {
    data,
    label
  } = props

  const chartRef = React.createRef();


  useEffect(()=>{
    var ctx = document.getElementById('myChart');
    var test = new Chart(ctx, {

      type: "line",
      data: {
        labels: label,
        datasets: [
          {
            label: "Workout Volume (lbs)",
            data: data,
            borderWidth:0.1,
            backgroundColor:[
              'rgb(40,127,62)'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        events: ['click'],
        legend: {
          labels: {
            fontColor: 'rgb(40,127,62)'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
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

  },[data,label])

    return (
      <div className= "wrapper">
        <canvas
          className = "chartjs-render-monitor"
          id="myChart"
          ref={chartRef}
          data = {data}
          label ={label}
        />
      </div>
    )
}
