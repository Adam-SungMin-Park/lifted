import React from 'react';



export default class AddWorkOut extends React.Component{

  constructor(props){
    super(props)

    const [inputList, setInputList] = useState([{
      exerciseName: "",
      weight: "",
      reps: ""
    }])
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)

  }

  handleInputChange(e,index){
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    this.setState({
      inputList:list
    })
  }

  handleRemoveClick(index){
    const list = [...inputList];
    list.splice(index,1);
    this.setState({
      inputList: list
    })
  }

  handleAddClick(){
    setInputList([...inputList, {
      exerciseName: "",
      weight: "",
      reps: ""}])
  }

  render(props){
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
          <input id= "workOutWeightInput" type = "text"></input>
          </div>

          <div className = "rowWorkOutPartsDate">
            <select name="workOutWorkOutPartsDrop" id="workOutWorkOutPartsDropDown">
              <option value="placeHolder1">parts placeholder1</option>
              <option value="placeHolder2">parts placeholder2</option>
              <option value="placeHolder3">parts placeholder3</option>
            </select>
            <input id ="workOutDateInPut" type="text" placeholder ="dd/mm/yy"></input>
          </div>
        {this.state.inputList.map((x,i)=>{
          return(
          <div className = "rowExerciseWeightRep">
            <select name="exerciseName" value={x.exerciseName} id="workOutExerciseDropDown">
              <option value="placeHolder1">exercise placeholder1</option>
              <option value="placeHolder2">exercise placeholder2</option>
              <option value="placeHolder3">exercise placeholder3</option>
            </select>
            <input name="weight" value={x.weight} id = "workOutExerciseWeight" type = "integer" placeholder = "135"></input>
            <input name="reps" value ={x.reps} id = "workOutExerciseRep" type ="integer" placeholder = '10'></input>

           <div className="btn-box">
              {this.state.inputList.length !== 1 && <button className="mr10" onClick = {()=> this.handleRemoveClick(i)}>Remove</button>}
              {this.state.inputList.length - 1 === i && <button onClick = {this.handleAddClick}>Add</button>}
            </div>
          </div>
          )
          })}
          <div className = "rowWorkOutVolume">
            <input id = "workOutVolume" type = "integer" placeholder="Total volume"></input>
          </div>
        </form>
      </div>
    )
  }
}
