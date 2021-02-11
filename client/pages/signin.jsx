import React from 'react'
import WorkOut from './workout';


export default class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      email:"",
      password:"",
      userId:""
    }
    this.handleSubmit= this.handleSubmit.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
  }

  handleSubmit(){
    fetch('/api/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => console.log(res.json()))
      .then(data => {
        this.setState({
          userId: data.userId
        })
        if(data==="nice try :) again"){
        alert(data)
        }
        else{
          alert("welcome back")
          }
        }
      )
      .catch(err => console.log(err))

    console.log(this.state)
  }


  handleChangePassword() {
    this.setState({
      password: event.target.value
    })
  }
  handleChangeEmail() {
    this.setState({
      email: event.target.value
    })
  }



  render(){
if(this.state.userId === ""){


    return(
      <div className="signUpPage">
        <h1><a href="#signup">Sign Up</a>/Sign in</h1>
        <form className="signUpForm">
          <div className="emailInput">
            <input onChange={this.handleChangeEmail} type="email" placeholder="youremail@idk.com"></input>
          </div>
          <div className="passwordInput">
            <input onChange={this.handleChangePassword} type="password" placeholder="Password"></input>
          </div>
          <div className="submitButton">
            <a href="#signin" onClick={this.handleSubmit}><button type="submit">LogIn!</button></a>
          </div>
        </form>
      </div>
    )
  }
  else{
    return(

      <div className="signUpPage">
       <h1>Welcome Back, user number {this.state.userId}! </h1>
      </div>
    )
  }
}
}
