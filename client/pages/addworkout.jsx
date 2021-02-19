import React from 'react';
import { LoginContext } from './signin'
export default class AddWorkOut extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      userId: this.props.userId,
      workOutPart:"",
      createdAt:"",
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
          console.log(res)
          alert("EXERCISE EXISTS")
          const dataArray = []
          for (var i = 0; i < res.length; i++) {
            dataArray.push(res[i])
          }
          this.setState({
            workOutPart: res[0].workOutPart,
            exercise: dataArray
          })
        } else {
          alert("must be a date without a workout...")
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

    if(e.target.id === "newExerciseName"){
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
    if(Number(e.target.value) === ""){
      return '';
    }
    if (e.target.id === "newExerciseWeight") {
      let testing = [...this.state.newExercise];
      let testing2 = { ...this.state.newExercise[index] };
      testing2.exerciseWeight = Number(e.target.value);
      testing[index] = testing2;
      this.setState({
        newExercise: testing
      })
    }
    else {
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
    if (e.target.id === "newExerciseReps") {
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
        exerciseWeight:"",
        exerciseReps:""
      }
    this.setState({
      newExercise: this.state.newExercise.concat(extraExercise)
    })
  }

  handleRemoveNew(index){
    event.preventDefault();
    const list = [...this.state.newExercise];
    list.splice(index,1);
    this.setState({
      newExercise:list
    })
  }

  handleRemoveClick(index) {
    event.preventDefault()
    const list = [...this.state.exercise];
    list.splice(index, 1);
    this.setState({
      exercise: list
    })
    fetch('/api/exercise/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.exercise[index])
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
      .then(res => console.log(res))
      .then(data => console.log(data))
      .catch(err => console.log(err))
    alert("updated :)")
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
    fetch('/api/exercises',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => console.log(res))
      .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  render(){
    console.log(this.state)
    this.handleVolume()

    if(this.state.createdAt === "" && this.state.exercise[0]===""){
      return(
        <div id="addWorkOutContainer">
          <div id="addWorkOutPageTitle">
            Add WorkOut
          </div>
          <div className="weightFoodDate">
            <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
            <div className="foodFoodDateButton">
              <button onClick={e => this.handleSubmitDate(e)}>GO to this Date!</button>
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
          </div>
      )}



    if(this.state.exercise[0].exerciseName !=="" && this.state.createdAt!=="" ){
    return (

      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
          Add WorkOut
        </div>
        <div className="weightFoodDate">
          <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
          <div className="foodFoodDateButton">
            <button onClick={e => this.handleSubmitDate(e)}>GO to this Date!</button>
          </div>
          </div>
        <form id = "workOutForm">

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
              <div>{index+1}. </div>
              <input  required onChange={(e)=> this.handleExerciseNameChange(e,index)} name="exerciseName" value={this.state.exercise[index].exerciseName} id="workOutExerciseDropDown"></input>
              <input required onChange={(e)=>this.handleWeightChange(e,index)} name="exerciseWeight" value={this.state.exercise[index].exerciseWeight} placeholder="weight" id="workOutExerciseWeight" type="integer" ></input>
              <input required onChange={(e)=>this.handleRepsChange(e,index)} name="exerciseReps" value={this.state.exercise[index].exerciseReps} placeholder ="reps" id="workOutExerciseRep" type="integer" ></input>
              <div className = "addOrRemove">
                {this.state.exercise.length > 1 && <button onClick ={()=>this.handleRemoveClick(index)} className = "removeButton">Remove</button>}
                {this.state.exercise.length !== 0 && <button onClick={(event) => this.handleUpdateClick(index)} className="updateButton">Update!</button>}

              </div>
            </div>
          )
        })}
        {this.state.newExercise.map((exercise,index)=>{
          return (
            <div key={index} className="rowExerciseWeightRep">
              <div>{`New Exercise ${index + 1}`}. </div>
              <input required onChange={(e) => this.handleExerciseNameChange(e, index)} name="exerciseName" value={this.state.newExercise[index].exerciseName} id="newExerciseName"></input>
              <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.newExercise[index].exerciseWeight} placeholder="lbs" id="newExerciseWeight" type="integer" ></input>
              <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.newExercise[index].exerciseReps} placeholder="reps" id="newExerciseReps" type="integer" ></input>
              <div className="addOrRemove">
                {this.state.newExercise.length !== 0 && <button onClick={(event,index) => this.handleRemoveNew(index)} className="removeButton">Remove</button>}

              </div>
            </div>
          )
        })}

          <div id ="exerciseAddButtonPlace">
            <button id= "exerciseAddButton" onClick = {this.handleAddClick}>Add</button>
          </div>

          <div className = "rowWorkOutVolume">
            <input value ={this.handleVolume()} id = "workOutVolume" type = "integer" placeholder="Total volume" readOnly></input>
          </div>
          <div className = "submitWorkOut">
            <a className="addWorkOut" href = "#user" onClick ={this.handleSubmit}>Save WorkOut</a>
          </div>
        </form>
      </div>

    )
  }
    if (this.state.exercise[0].exerciseName === ""){
    return(
      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
          Add WorkOut
        </div>
        <div className="weightFoodDate">
          <input onChange={e => this.handleChangeDate(e)} required type="date"></input>
          <div className="foodFoodDateButton">
            <button onClick={e => this.handleSubmitDate(e)}>GO to this Date!</button>
          </div>
        </div>
        <form id="workOutForm">

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
                <div>{`New Exercise ${index + 1}`}. </div>
                <input required onChange={(e) => this.handleExerciseNameChange(e, index)} name="exerciseName" value={this.state.newExercise[index].exerciseName} id="newExerciseName"></input>
                <input required onChange={(e) => this.handleWeightChange(e, index)} name="exerciseWeight" value={this.state.newExercise[index].exerciseWeight} placeholder="weight" id="newExerciseWeight" type="integer" ></input>
                <input required onChange={(e) => this.handleRepsChange(e, index)} name="exerciseReps" value={this.state.newExercise[index].exerciseReps} placeholder="reps" id="newExerciseReps" type="integer" ></input>
                <div className="addOrRemove">
                  {this.state.newExercise.length !==0 && <button onClick={(event,index) => this.handleRemoveNew(index)} className="removeButton">Remove</button>}

                </div>
              </div>
            )
          })}

          <div id="exerciseAddButtonPlace">
            <button id="exerciseAddButton" onClick={this.handleAddClick}>Add</button>
          </div>

          <div className="rowWorkOutVolume">
            <input value={this.handleVolume()} id="workOutVolume" type="integer" placeholder="Total volume" readOnly></input>
          </div>
          <div className="submitWorkOut">
            <a className="addWorkOut" href="#user" onClick={this.handleSubmit}>Save WorkOut</a>
          </div>
        </form>
      </div>
    )
  }
}
}
