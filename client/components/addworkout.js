import React , { useEffect, useState }from "react";
import WorkoutOverView from "./workout";
export default function AddWorkOut (){
  const [date , setDate] = useState(null);
  const [workOutPart , setWorkOutPart] = useState('Select Workout Part');
  const [exercise , setExercise] = useState('');
  const [newExercise , setNewExercise] = useState([{exerciseName : "", exerciseWeight : "" , exerciseReps : "" }])
  const options = ['Select Workout Part', 'Chest' , 'Shoulder', 'Back' , 'Legs' , 'Full Body', 'Push', 'Pull']

  useEffect(()=>{
    fetch('/api/workout/reload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date})
    })
      .then(res => res.json())
      .then(res => {
        if (res.length > 0) {
          const dataArray = []
          for (var i = 0; i < res.length; i++) {
            dataArray.push(res[i])
          }
          setWorkOutPart(res[0].workOutPart);
          setExercise(dataArray);
        } else {
          setExercise('')
        }
      })
  },[date])

  function handleExerciseChange(e,index){
    let key = e.target.name;
    let copy = [...exercise]
    copy[index][key] = e.target.value;
    setExercise(copy)
  }
  function handleNewExerciseChange(e,index){
    let key = e.target.name;
    let copy = [...newExercise]
    if(key !== "exerciseName"){
      copy[index][key] = Number(e.target.value);
    }else{
      copy[index][key] = e.target.value;
    }
    setNewExercise(copy)
  }



  console.log(newExercise)

if(exercise.length === 0 ){
    return (
      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
            Add Workout
        </div>
        <div className="weightFoodDate">
          <input className="addWorkOutDate" onChange = {e => setDate(e.target.value)} required type="date"></input>

        </div>
        <div className="rowWorkOutPartsDate">
          <select required onChange = {e => setWorkOutPart(e.target.value)}  name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
           {options.map((options,index)=>{
             return(
               <option key = {index} value = {options}>{options}</option>
             )
           })}
          </select>
        </div>
         {date && newExercise.map((exercise,index)=>{
           return(
            <div key={index} className="rowExerciseWeightRep">
              <div className="addWorkOutInputField">
                <div className="addWorkOutName">Name
                  <input placeholder="Exercise Name" name ="exerciseName" label="Exercise Name" required onChange ={e=>handleNewExerciseChange(e,index)} className="newExerciseName"></input>
                </div>
                <div className="addWorkOutWeight">Weight (lbs)
                  <input min ="0" required  name="exerciseWeight" value={newExercise.exerciseWeight} onChange ={e=>handleNewExerciseChange(e,index)} placeholder="0" className="newExerciseWeight" type="number" ></input>
                </div>
                <div className="addWorkOutReps">Reps
                  <input min="0" required  name="exerciseReps" value={newExercise.exerciseReps} onChange ={e=>handleNewExerciseChange(e,index)} placeholder="0" className="newExerciseReps" type="number" ></input>
                </div>
                <div className="newAddOrRemove">
                  {newExercise.length !== 0 && <button className="newRemoveButton">Remove</button>}
                </div>
              </div>
            </div>
           )
            })}
      </div>
    )
    }

  if(exercise.length !==0){
    return(
      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
            Add Workout
        </div>
        <div className="weightFoodDate">
          <input className="addWorkOutDate" onChange = {e => setDate(e.target.value)} required type="date"></input>

        </div>
        <div className="rowWorkOutPartsDate">
          <select onChange = {e=>setWorkOutPart(e.target.value)} required value = {workOutPart}  name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
            {options.map((options,index)=>{
             return(
               <option key = {index} value = {options}>{options}</option>
             )
           })}
          </select>
        </div>
        {exercise.map((exercises, index) => {
          return (
            <div key={index} className="rowExerciseWeightRep">
              <div className="previousWorkOutInputField">
                <div className="previousWorkOutName">Name
                <input key = {index} required  name="exerciseName" value={exercise[index].exerciseName} onChange ={e=> handleExerciseChange(e,index)} className="workOutExerciseDropDown"></input>
                </div>
                <div className="previousWorkOutWeight">Weight (lbs)
                <input required  name="exerciseWeight" value={exercise[index].exerciseWeight} onChange ={e=> handleExerciseChange(e,index)}  className="workOutExerciseWeight" type="number" ></input>
                </div>
                <div className="previousWorkOutReps">Reps
                <input required  name="exerciseReps" value={exercise[index].exerciseReps} onChange ={e=> handleExerciseChange(e,index)}  className="workOutExerciseRep" type="number" ></input>
                </div>
                <div className="addOrRemove" id={index}>
                  {exercise.length !== 0 && <button  id={index} className="removeButton">Remove</button>}
                  {exercise.length !== 0 && <button  className="updateButton">Update</button>}
                </div>
              </div>
            </div>
          )
        })}
        {newExercise.map((exercises,index)=>{
          return(
            <div key={index} className="rowExerciseWeightRep">
              <div className="addWorkOutInputField">
                <div className="addWorkOutName">Name
                  <input placeholder="Exercise Name" value = {newExercise[index].exerciseName} onChange ={e=>handleNewExerciseChange(e,index)} name = "exerciseName" label="Exercise Name" required  className="newExerciseName"></input>
                </div>
                <div className="addWorkOutWeight">Weight (lbs)
                  <input min ="0" required onChange ={e=>handleNewExerciseChange(e,index)} name="exerciseWeight" value={newExercise[index].exerciseWeight} placeholder="0" className="newExerciseWeight" type="number" ></input>
                </div>
                <div className="addWorkOutReps">Reps
                  <input min="0" required onChange ={e=>handleNewExerciseChange(e,index)} name="exerciseReps" value={newExercise[index].exerciseReps} placeholder="0" className="newExerciseReps" type="number" ></input>
                </div>
                <div className="newAddOrRemove">
                  {newExercise.length !== 0 && <button className="newRemoveButton">Remove</button>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
