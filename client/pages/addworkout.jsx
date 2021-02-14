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
      ]}

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

  handleExerciseNameChange(e,index){
    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.exerciseName = e.target.value;
    test[index] = test2;
    this.setState({
      exercise: test
    })
  }

  handleVolume(){
    let totalVolume =0
    if(this.state.exercise.length === 0 ){
      return ""
    }
    for(var i = 0 ; i < this.state.exercise.length ; i++){
      totalVolume = Number(totalVolume + (this.state.exercise[i].exerciseWeight * this.state.exercise[i].exerciseReps))
    }

    return totalVolume;
  }

  handleWeightChange(e,index){

    let test = [...this.state.exercise];
    let test2 = {...this.state.exercise[index]};
    test2.exerciseWeight = Number(e.target.value);
    test[index] = test2;
    this.setState({
      exercise:test
    })
  }

  handleRepsChange(e,index){

    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.exerciseReps = Number(e.target.value);
    test[index] = test2;

    this.setState({
      exercise: test
    })
    }

  handleInputChange(property){
    return event=>{
      this.setState({
        [property]:event.target.value
      })
    }
  }

  handleRemoveClick(index){
    event.preventDefault()
    const list = [...this.state.exercise];
    list.splice(index,1);
    this.setState({
      exercise:list
    })
    fetch('/api/exercise/delete',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.exercise[index])
    })
    alert('No such thing as overtraining')
  }

  handleAddClick(event){

    event.preventDefault()
    const extraExercise = this.state.exercise.concat(this.state.exercise[0])
    this.setState({
      exercise: extraExercise
    })
    }

  handleChangeDate(){
    this.setState({
      createdAt:event.target.value,
      exercise: [{
        exerciseName: "",
        exerciseWeight: "",
        exerciseReps: ""
      }]
    })

  }
  handleUpdateClick(){
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

  handleSubmitDate(){
    fetch('/api/workout/reload',{
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
          console.log("EXERCISE EXIST")
          const dataArray = []
          for(var i = 0 ;i < res.length ; i++){
            dataArray.push(res[i])
          }
          this.setState({

            workOutPart:res[0].workOutPart,
            exercise: dataArray
          })
        } else {
          console.log("must be a date without a workout...")
            this.setState({
              exercise :[{
                exerciseName: "",
                exerciseWeight: "",
                exerciseReps: ""
              }]
            })
        }
      })

  }

  render(){
    console.log(this.state)
    this.handleVolume()
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
              <select  required onChange={(e)=> this.handleExerciseNameChange(e,index)} name="exerciseName" value={this.state.exercise[index].exerciseName} id="workOutExerciseDropDown">
                <option>Select Exercise</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Squat">Squat</option>
                <option value="Dead Lift">Dead Lift</option>
             </select>
              <input required onChange={(e)=>this.handleWeightChange(e,index)} name="exerciseWeight" value={this.state.exercise[index].exerciseWeight} id="workOutExerciseWeight" type="integer" ></input>
              <input required onChange={(e)=>this.handleRepsChange(e,index)} name="exerciseReps" value={this.state.exercise[index].exerciseReps} id="workOutExerciseRep" type="integer" ></input>
              <div className = "addOrRemove">
                {this.state.exercise.length !==1 && <button onClick ={()=>this.handleRemoveClick(index)} className = "removeButton">Remove</button>}
                {this.state.exercise.length !== 1 && <button onClick={() => this.handleUpdateClick(index)} className="updateButton">Update!</button>}

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
            <a href = "#user" onClick ={this.handleSubmit}>Save WorkOut</a>
          </div>
        </form>
      </div>

    )
  }
}
