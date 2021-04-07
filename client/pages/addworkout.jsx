import React from 'react';
import { LoginContext } from './signin'
export default class AddWorkOut extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      workOutSaved:"",
      userId: this.props.userId,
      workOutPart:"default",
      createdAt:null,
      exercise:[
       {
        exercisesId:"",
        exerciseName:"",
        exerciseWeight:"",
        exerciseReps:""
      },
      ],
      newExercise:[
        {
          exerciseName: "",
          exerciseWeight: "",
          exerciseReps: ""
        },
      ]
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmitDate = this.handleSubmitDate.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleRemoveNew = this.handleRemoveNew.bind(this);
  }

  handleChangeDate() {
    this.setState({
      createdAt: event.target.value,
      exercise: [{
        exerciseName: "",
        exerciseWeight: "",
        exerciseReps: ""
      }]
    })
  }

  handleSubmitDate() {
    fetch('/api/workout/reload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => {
        if (res.length > 0) {
          const dataArray = []
          for (var i = 0; i < res.length; i++) {
            dataArray.push(res[i])
          }
          this.setState({
            workOutPart: res[0].workOutPart,
            exercise: dataArray
          })
        } else {

          this.setState({
            exercise: [{
              exerciseName: "",
              exerciseWeight: "",
              exerciseReps: ""
            }]
          })
        }
      })
  }


  handleInputChange(property) {
    return event => {
      this.setState({
        [property]: event.target.value
      })
    }
  }


  handleExerciseNameChange(e, index) {

    if(e.target.className === "newExerciseName"){
      let testing = [...this.state.newExercise];
      let testing2 = { ...this.state.newExercise[index] };
      testing2.exerciseName = e.target.value;
      testing[index] = testing2;
      this.setState({
        newExercise : testing
      })
    }
    else{


    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.exerciseName = e.target.value;
    test[index] = test2;
    this.setState({
      exercise: test
    })
  }
  }

  handleWeightChange(e, index) {
    if(Number(e.target.value) === NaN){
      return '';
    }
    if (e.target.className === "newExerciseWeight" && Number(e.target.value)!==NaN) {
      let testing = [...this.state.newExercise];
      let testing2 = { ...this.state.newExercise[index] };
      testing2.exerciseWeight = Number(e.target.value);
      testing[index] = testing2;
      this.setState({
        newExercise: testing
      })
    }
    if (e.target.className !== "newExerciseWeight" && Number(e.target.value)!==NaN) {
    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.exerciseWeight = Number(e.target.value);
    test[index] = test2;
    this.setState({
      exercise: test
    })
  }
  }

  handleRepsChange(e, index) {
    if (e.target.className === "newExerciseReps" && typeof (parseInt(e.target.value)) === 'number') {
      let testing = [...this.state.newExercise];
      let testing2 = { ...this.state.newExercise[index] };
      testing2.exerciseReps = Number(e.target.value);
      testing[index] = testing2;
      this.setState({
        newExercise: testing
      })
    }
    else {
    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.exerciseReps = Number(e.target.value);
    //test2.exerciseWeight = Number(this.state.exercise[index].exerciseWeight)
    test[index] = test2;
    this.setState({
      exercise: test
    })
  }
  }
  handleAddClick(event) {
    event.preventDefault()

    const extraExercise =
      {
        exercisesId:"",
        exerciseName:"",
        exerciseWeight:0,
        exerciseReps:0
      }
    this.setState({
      newExercise: this.state.newExercise.concat(extraExercise)
    })
  }

  handleRemoveNew(index){

    event.preventDefault();
    const list = [...this.state.newExercise];
    if(this.state.newExercise.length === 1){
      return ""
    }
    list.splice(event.target.className,1);
    this.setState({
      newExercise:list
    })
  }

  handleRemoveClick(index) {
    event.preventDefault()
    const list = [...this.state.exercise];
    list.splice(event.target.className, 1);
    this.setState({
      exercise: list
    })
    fetch('/api/exercise/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.exercise[event.target.className])
    })
  }


  handleUpdateClick() {
    fetch('/api/exercise/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res =>(res))
      .then(data => (data))
      .catch(err => { return err })
      }

  handleVolume() {
    let totalVolume = 0;
    let totalVolume2 =0;
    if (this.state.exercise.length === 0 && this.state.newExercise.length === 0 ) {
      return ""
    }
    for (var i = 0; i < this.state.exercise.length; i++) {
      totalVolume = Number(totalVolume + (this.state.exercise[i].exerciseWeight * this.state.exercise[i].exerciseReps))
    }
    for (var j = 0 ; j < this.state.newExercise.length ; j++){
      totalVolume2 =Number(totalVolume2 + (this.state.newExercise[j].exerciseWeight * this.state.newExercise[j].exerciseReps))
    }
    return totalVolume+totalVolume2;
  }

  handleSubmit(){
    if(this.state.workOutPart === "default"){
      this.setState({
        workOutSaved: "#addworkout"
      })
      return ''
    }
    else{
      fetch('/api/exercises',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(this.state)
      }).then(res =>(res))
        .then(data => (data))
        .catch(err => { return err })
    this.setState({
      workOutSaved:"#workout"
    })
      }
  }

  render(){
    this.handleVolume()
    if(this.state.createdAt === null && this.state.exercise[0].exerciseName===""){
      return(
        <div id="addWorkOutContainer">
          <div id="addWorkOutPageTitle">
            Add Workout
          </div>
          <div className="weightFoodDate">
            <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
            <div className="foodFoodDateButton">
              <button className = "workOutDateButton" onClick={e => this.handleSubmitDate(e)}>Set Workout Date</button>
            </div>
          </div>
            <div className="rowWorkOutPartsDate">
              <select required value={this.state.workOutPart} onChange={this.handleInputChange('workOutPart')} name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
                <option value = "default">Select WorkOut Part!</option>
                <option value="Chest">Chest</option>
                <option value="Shoulder">Shoulder</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Full Body">Full Body</option>
                <option value="Push">Push</option>
                <option value="Pull">Pull</option>
              </select>
            </div>
          </div>
      )}

    if(this.state.exercise.length === 0 ){
      return (
        <div id="addWorkOutContainer">
          <div id="addWorkOutPageTitle">
            Add Workout
        </div>
          <div className="weightFoodDate">
            <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
            <div className="foodFoodDateButton">
              <button className = "workOutDateButton" onClick={e => this.handleSubmitDate(e)}>Set Workout Date</button>
            </div>
          </div>


          <div className="rowWorkOutPartsDate">
            <select required value={this.state.workOutPart} onChange={this.handleInputChange('workOutPart')} name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
              <option>Select WorkOut Part!</option>
              <option value="Chest">Chest</option>
              <option value="Shoulder">Shoulder</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Full Body">Full Body</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
            </select>
          </div>

          {this.state.exercise.map((exercise, index) => {
            return (
              <div key={index} className="rowExerciseWeightRep">

                <div className="previousWorkOutInputField">
                  <div className="previousWorkOutName">Name
                  <input required onChange={(e) => this.handleExerciseNameChange(e, index)} name="exerciseName" placeholder ="Exercise Name" value={this.state.exercise[index].exerciseName} className="workOutExerciseDropDown"></input>
                  </div>
                  <div className="previousWorkOutWeight">Weight
                  <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.exercise[index].exerciseWeight} placeholder="weight" className="workOutExerciseWeight" type="number" ></input>
                  </div>
                  <div className="previousWorkOutReps">Reps
                  <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.exercise[index].exerciseReps} placeholder="reps" className="workOutExerciseRep" type="number" ></input>
                  </div>
                  <div className="addOrRemove">
                    {this.state.exercise.length !== 0 && <button onClick={(e) => this.handleRemoveClick(e, index)} className="removeButton">Remove</button>}
                    {this.state.exercise.length !== 0 && <button onClick={(e) => this.handleUpdateClick(e, index)} className="updateButton">Update!</button>}
                  </div>
                </div>
              </div>
            )
          })}
          {this.state.newExercise.map((exercise, index) => {
            return (
              <div key={index} className="rowExerciseWeightRep">


                <div className="addWorkOutInputField">
                  <div className="addWorkOutName">Name
                    <input placeholder="Exercise Name" label="Exercise Name" required onChange={(e) => this.handleExerciseNameChange(e, index)} name="exerciseName" value={this.state.newExercise[index].exerciseName} className="newExerciseName"></input>
                  </div>
                  <div className="addWorkOutWeight">Weight
                    <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.newExercise[index].exerciseWeight} placeholder="0" className="newExerciseWeight" type="number" ></input>
                  </div>
                  <div className="addWorkOutReps">Reps
                    <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.newExercise[index].exerciseReps} placeholder="0" className="newExerciseReps" type="number" ></input>
                  </div>
                  <div className="newAddOrRemove">
                    {this.state.newExercise.length !== 0 && <button onClick={(e) => this.handleRemoveNew(e, index)} className="newRemoveButton">Remove</button>}
                  </div>
                </div>
              </div>
            )
          })}

          <div id="exerciseAddButtonPlace">
            <button id="exerciseAddButton" onClick={this.handleAddClick}>Add More Exercise</button>
          </div>

          <div className="rowWorkOutVolume">
            <input value={this.handleVolume()} id="workOutVolume" type="number" placeholder="Total volume" readOnly></input>
          </div>
          <div className="submitWorkOut">
            <a className="addWorkOut" href={this.state.workOutSaved} onClick={this.handleSubmit}>Save Work Out</a>
          </div>

        </div>
      )
    }

    if(this.state.exercise[0].exerciseName !=="" && this.state.createdAt!=="" ){

      return (


      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
          Add Workout
        </div>
        <div className="weightFoodDate">
          <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
          <div className="foodFoodDateButton">
              <button className="workOutDateButton" onClick={e => this.handleSubmitDate(e)}>Set Workout Date</button>
          </div>
          </div>


          <div className = "rowWorkOutPartsDate">
            <select required value = {this.state.workOutPart} onChange={this.handleInputChange('workOutPart')} name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
              <option>Select WorkOut Part!</option>
              <option value="Chest">Chest</option>
              <option value="Shoulder">Shoulder</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Full Body">Full Body</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
            </select>
          </div>

        {this.state.exercise.map((exercise,index)=>{
          return(
            <div key = {index} className="rowExerciseWeightRep">

              <div className = "previousWorkOutInputField">
                <div className ="previousWorkOutName">Name
                  <input  required onChange={(e)=> this.handleExerciseNameChange(e,index)} name="exerciseName" value={this.state.exercise[index].exerciseName} className="workOutExerciseDropDown"></input>
                </div>
                <div className ="previousWorkOutWeight">Weight
                  <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.exercise[index].exerciseWeight} placeholder="weight" className="workOutExerciseWeight" type="number" ></input>
                </div>
                <div className = "previousWorkOutReps">Reps
                  <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.exercise[index].exerciseReps} placeholder="reps" className="workOutExerciseRep" type="number" ></input>
                </div>
                <div className = "addOrRemove">
                  {this.state.exercise.length !== 0 && <button onClick ={(e)=>this.handleRemoveClick(e, index)} className = "removeButton">Remove</button>}
                  {this.state.exercise.length !== 0 && <button onClick={(e) => this.handleUpdateClick(e, index)} className="updateButton">Update!</button>}
                </div>
              </div>
            </div>
          )
        })}
        {this.state.newExercise.map((exercise,index)=>{
          return (
            <div key={index} className="rowExerciseWeightRep">


              <div className="addWorkOutInputField">
                <div className="addWorkOutName">Name
                    <input label="Exercise Name" required onChange={(e) => this.handleExerciseNameChange(e, index)} name="exerciseName" value={this.state.newExercise[index].exerciseName} className="newExerciseName"></input>
                </div>
                <div className="addWorkOutWeight">Weight
                    <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.newExercise[index].exerciseWeight} placeholder="0" className="newExerciseWeight" type="number" ></input>
                </div>
                <div className="addWorkOutReps">Reps
                    <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.newExercise[index].exerciseReps} placeholder="0" className="newExerciseReps" type="number" ></input>
                </div>
                <div className="newAddOrRemove">
                  {this.state.newExercise.length !== 0 && <button onClick={(e) => this.handleRemoveNew(e, index)} className="newRemoveButton">Remove</button>}
                </div>
              </div>
            </div>
          )
        })}

          <div id ="exerciseAddButtonPlace">
            <button id= "exerciseAddButton" onClick = {this.handleAddClick}>Add More Exercise</button>
          </div>

          <div className = "rowWorkOutVolume">
            <input value ={this.handleVolume()} id = "workOutVolume" type = "number" placeholder="Total volume" readOnly></input>
          </div>
          <div className = "submitWorkOut">
            <a className="addWorkOut" href = {this.state.workOutSaved} onClick ={this.handleSubmit}>Save Work Out</a>
          </div>

      </div>

    )
  }
    if (this.state.exercise[0].exerciseName === ""){

    return(
      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
          Add Workout
        </div>
        <div className="weightFoodDate">
          <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
          <div className="foodFoodDateButton">
            <button className = "workOutDateButton" onClick={e => this.handleSubmitDate(e)}>Set Workout Date</button>
          </div>
        </div>


          <div className="rowWorkOutPartsDate">
            <select required value={this.state.workOutPart} onChange={this.handleInputChange('workOutPart')} name="workOutWorkOutPartDrop" id="workOutWorkOutPartDropDown">
              <option>Select WorkOut Part!</option>
              <option value="Chest">Chest</option>
              <option value="Shoulder">Shoulder</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Full Body">Full Body</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
            </select>
          </div>
          {this.state.newExercise.map((exercise, index) => {
            return (
              <div key={index} className="rowExerciseWeightRep">


                  <div className = "addWorkOutInputField">
                  <div className ="addWorkOutName">Name
                    <input placeholder="Exercise Name" label="Exercise Name" required onChange={(e) => this.handleExerciseNameChange(e, index)} name="exerciseName" value={this.state.newExercise[index].exerciseName} className="newExerciseName"></input>
                  </div>
                  <div className = "addWorkOutWeight">Weight
                    <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.newExercise[index].exerciseWeight} placeholder="0" className="newExerciseWeight" type="number" ></input>
                  </div>
                  <div className = "addWorkOutReps">Reps
                    <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.newExercise[index].exerciseReps} placeholder="0" className="newExerciseReps" type="number" ></input>
                  </div>
                  <div className="newAddOrRemove">
                    {this.state.newExercise.length !== 0 && <button onClick={(e) => this.handleRemoveNew(e, index)} className="newRemoveButton">Remove</button>}
                  </div>
                </div>
              </div>
            )
          })}

          <div id="exerciseAddButtonPlace">
            <button id="exerciseAddButton" onClick={this.handleAddClick}>Add More Exercise</button>
          </div>

          <div className="rowWorkOutVolume">
            <input value={this.handleVolume()} id="workOutVolume" type="number" placeholder="Total volume" readOnly></input>
          </div>
          <div className="submitWorkOut">
          <a className="addWorkOut" href={this.state.workOutSaved} onClick={this.handleSubmit}>Save Work Out</a>
          </div>

      </div>
    )
  }
}
}
