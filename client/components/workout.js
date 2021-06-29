import React,{ useEffect,useState } from "react";
import LineGraph from "../pages/linegraph";
import Chart from "chart.js";



export default function WorkoutOverView(){
  const [allData , setAllData] = useState([]);
  const [volume, setVolume] = useState([]);
  const [label , setLabel ] = useState([]);
  const [workOutPart , setWorkOutPart] = useState("default");
  const [data, setData] = useState([]);
  const [graphLabel , setGraphLabel] = useState([]);


  useEffect(()=>{
     fetch('/api/exercises').then(res => res.json())
      .then(res => {
        const allDataArray = [];
        const allLabelArray = [];
        for (var i = res.length-1 ; i > 0; i--){
          let test = {};
          test.data = parseInt(res[i].total_volume)
          test.label = res[i].createdAt.slice(0,10)
          test.workOutPart = res[i].workOutPart
          setAllData(prev => [...prev, test]);
          setVolume(prev => [...prev, parseInt(res[i].total_volume)]);
          setLabel(prev => [...prev, res[i].createdAt.slice(0,10)]);
          setData(prev => [...prev, parseInt(res[i].total_volume)]);
          setGraphLabel(prev => [...prev, res[i].createdAt.slice(0,10)])
      }})
      .catch(error => {return(error)})
  },[])

  function handleWorkOutPart(e){
    setWorkOutPart(e.target.value);
    let dataArray = [];
    let labelArray = [];
    for(var i = 0 ; i < allData.length; i++){
      if(event.target.value === allData[i].workOutPart){
        dataArray.push(allData[i].data);
        labelArray.push(allData[i].label);
        setData(dataArray);
        setGraphLabel(labelArray);
      }
    }
      if(e.target.value === "default"){
        setData(volume);
        setGraphLabel(label);
      }
  }
  return(
  <div className="wrapper">
      <div id = "workOutPageTitle">
        Workout Overview
      </div>
      <div id="homeWorkOutPartsDropDown">
        <select onChange={e=>handleWorkOutPart(e)}name="workoutParts" id="workOutPartsDropDown" value ={workOutPart}>
          <option value = "default">Select Workout Part!</option>
          <option value="Chest">Chest</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Full Body">Full Body</option>
          <option value="Push">Push</option>
          <option value="Pull">Pull</option>
        </select>
        <div className="foodFoodDateButton">
        </div>
      </div>
          <LineGraph
            data= {data}
            label = {graphLabel}
          />
      <div id = "workOutAddButtonPlace">
        <a href= "#addworkout" id = "workOutAdd" >
          Add Workout
        </a>
      </div>
    </div>
  )
}
