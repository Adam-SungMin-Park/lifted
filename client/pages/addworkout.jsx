import React from 'react';
export default class AddWorkOut extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      workOutParts:"",
      workOutDate:"",
      exercise:[
       {
        exerciseName:"",
        weight:"",
        reps:""
      },

      ]}

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleExerciseNameChange = this.handleExerciseNameChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this)
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleVolume = this.handleVolume.bind(this)
  }

  handleSubmit(){
    //event.returnValue = false;
    console.log(this.state)
  }

  handleExerciseNameChange(e,index){
    console.log('fire')
    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.exerciseName = e.target.value;
    test[index] = test2;
    this.setState({
      exercise: test
    })
  }

  handleVolume(){
    console.log("volume calc")
    let totalVolume =0

    for(var i = 0 ; i < this.state.exercise.length ; i++){
      totalVolume = Number(totalVolume + (this.state.exercise[i].weight * this.state.exercise[i].reps))
    }

    return totalVolume;
  }

  handleWeightChange(e,index){

    let test = [...this.state.exercise];
    let test2 = {...this.state.exercise[index]};
    test2.weight = Number(e.target.value);
    test[index] = test2;
    this.setState({
      exercise:test
    })

  }



  handleRepsChange(e,index){

    let test = [...this.state.exercise];
    let test2 = { ...this.state.exercise[index] };
    test2.reps = Number(e.target.value);
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
  }

  handleAddClick(event){
    event.preventDefault()
    const extraExercise = this.state.exercise.concat(this.state.exercise[0])
    this.setState({
      exercise: extraExercise
    })
    console.log(this.state);


    }

  render(props){
    this.handleVolume()
    return (

      <div id="addWorkOutContainer">
        <div id="addWorkOutPageTitle">
          Add WorkOut
        </div>
        <form id = "workOutForm">
          <div className = "rowRoutineWeight">
            <select name="workOutRoutineDrop" id="workOutRoutineDropDown">
              <option value="placeHolder1">routine placeholder1</option>
              <option value="placeHolder2">routine placeholder2</option>
              <option value="placeHolder3">routine placeholder3</option>
            </select>
          </div>

          <div className = "rowWorkOutPartsDate">
            <select value = {this.state.workOutPart} onChange={this.handleInputChange('workOutParts')} name="workOutWorkOutPartsDrop" id="workOutWorkOutPartsDropDown">
              <option>Select WorkOut Part!</option>
              <option value="Chest">Chest</option>
              <option value="Shoulder">Shoulder</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Full Body">Full Body</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
            </select>
            <input value = {this.state.workOutDate} onChange = {this.handleInputChange('workOutDate')} id ="workOutDateInPut" type="text" placeholder ="dd/mm/yy"></input>
          </div>

        {this.state.exercise.map((exercise,index)=>{
          return(
            <div className="rowExerciseWeightRep">
            <select onChange={(e)=> this.handleExerciseNameChange(e,index)} name="exerciseName" value={this.state.exercise[index].exerciseName} id="workOutExerciseDropDown">
                <option>Select Exercise</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Squat">Squat</option>
                <option value="Dead Lift">Dead Lift</option>
            </select>
              <input onChange={(e)=>this.handleWeightChange(e,index)} name="weight" value={this.state.exercise[index].weight} id="workOutExerciseWeight" type="integer" placeholder="135"></input>
              <input onChange={(e)=>this.handleRepsChange(e,index)} name="reps" value={this.state.exercise[index].reps} id="workOutExerciseRep" type="integer" placeholder='10'></input>
            <div className = "addOrRemove">
                {this.state.exercise.length !==1 && <button onClick ={this.handleRemoveClick} className = "removeButton">Remove</button>}
            </div>
            </div>
          )
        })}

          <div id ="exerciseAddButtonPlace">
            <button id= "exerciseAddButton" onClick = {this.handleAddClick}>Add</button>
          </div>

          <div className = "rowWorkOutVolume">
            <input value ={this.handleVolume()} id = "workOutVolume" type = "integer" placeholder="Total volume"></input>
          </div>
          <div className = "submitWorkOut">
            <a href = "#workout" onClick ={this.handleSubmit}>Save WorkOut</a>
          </div>
        </form>
      </div>
    )
  }
}
