import React , { useEffect, useState }from "react";
export default function AddWorkOut (){
  const [date , setDate] = useState("");
  const [workOutPart , setWorkOutPart] = useState();
  const [exercise , setExercise] = useState([]);
  const [newExercise , setNewExercise] = useState([{exerciseName : "", exerciseWeight : "" , exerciseReps : "" }])

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
          setExercise("")

        }
      })
  },[date])



  console.log(exercise)
if(exercise.length === 0 ){
    return (
      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
            Add Workout
        </div>
        <div className="weightFoodDate">
          <input className="addWorkOutDate" onChange = {e => setDate(e.target.value)} required type="date"></input>
          <div className="foodFoodDateButton">
            <button className = "workOutDateButton">Set Workout Date</button>
          </div>
        </div>
        <div className="rowWorkOutPartsDate">
          <select required  name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
            <option>Select Workout Part</option>
            <option value="Chest">Chest</option>
            <option value="Shoulder">Shoulder</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Full Body">Full Body</option>
            <option value="Push">Push</option>
            <option value="Pull">Pull</option>
          </select>
        </div>
        {date!=="" &&
          <div  className="rowExerciseWeightRep">
            <div className="addWorkOutInputField">
              <div className="addWorkOutName">Name
                <input placeholder="Exercise Name" label="Exercise Name" required  className="newExerciseName"></input>
              </div>
              <div className="addWorkOutWeight">Weight (lbs)
                <input min ="0" required  name="exerciseWeight" value={newExercise.exerciseWeight} placeholder="0" className="newExerciseWeight" type="number" ></input>
              </div>
              <div className="addWorkOutReps">Reps
                <input min="0" required  name="exerciseReps" value={newExercise.exerciseReps} placeholder="0" className="newExerciseReps" type="number" ></input>
              </div>
              <div className="newAddOrRemove">
                {newExercise.length !== 0 && <button className="newRemoveButton">Remove</button>}
              </div>
            </div>
          </div>
            }
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
          <div className="foodFoodDateButton">
            <button className = "workOutDateButton">Set Workout Date</button>
          </div>
        </div>
        <div className="rowWorkOutPartsDate">
          <select required  name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
            <option>Select Workout Part</option>
            <option value="Chest">Chest</option>
            <option value="Shoulder">Shoulder</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Full Body">Full Body</option>
            <option value="Push">Push</option>
            <option value="Pull">Pull</option>
          </select>
        </div>
        {exercise.map((exercise, index) => {
          return (
            <div key={index} className="rowExerciseWeightRep">
              <div className="previousWorkOutInputField">
                <div className="previousWorkOutName">Name
                <input required  name="exerciseName" placeholder ="Exercise Name" value={exercise.exerciseName} className="workOutExerciseDropDown"></input>
                </div>
                <div className="previousWorkOutWeight">Weight (lbs)
                <input required  name="exerciseWeight" value={exercise.exerciseWeight} placeholder="weight" className="workOutExerciseWeight" type="number" ></input>
                </div>
                <div className="previousWorkOutReps">Reps
                <input required  name="exerciseReps" value={exercise.exerciseReps} placeholder="reps" className="workOutExerciseRep" type="number" ></input>
                </div>
                <div className="addOrRemove" id={index}>
                  {exercise.length !== 0 && <button  id={index} className="removeButton">Remove</button>}
                  {exercise.length !== 0 && <button  className="updateButton">Update</button>}
                </div>
              </div>
            </div>
          )
        })}
        {newExercise.map((exercise,index)=>{
          return(
            <div key={index} className="rowExerciseWeightRep">
              <div className="addWorkOutInputField">
                <div className="addWorkOutName">Name
                  <input placeholder="Exercise Name" label="Exercise Name" required  className="newExerciseName"></input>
                </div>
                <div className="addWorkOutWeight">Weight (lbs)
                  <input min ="0" required  name="exerciseWeight" value={newExercise.exerciseWeight} placeholder="0" className="newExerciseWeight" type="number" ></input>
                </div>
                <div className="addWorkOutReps">Reps
                  <input min="0" required  name="exerciseReps" value={newExercise.exerciseReps} placeholder="0" className="newExerciseReps" type="number" ></input>
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
