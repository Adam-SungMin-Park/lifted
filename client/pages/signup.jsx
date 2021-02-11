import React, { Component } from 'react';

export default class SignUp extends React.Component {

    constructor(props){
      super(props)
      this.state ={
        email:"",
        password:"",
        name:""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);

    }

    handleSubmit(){
      fetch('/api/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then(res => console.log(res))
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }



  handleChangePassword(){
    this.setState({
      password: event.target.value
    })
  }
  handleChangeEmail(){
    this.setState({
      email: event.target.value
    })
  }



  render(){
    console.log(this.state)
    return(
      <div className = "signUpPage">
        <h1>Sign Up/ <a href ="#signin">Sign in</a></h1>
        <form className = "signUpForm">
          <div className = "emailInput">
            <input required onChange={this.handleChangeEmail} type = "email" placeholder = "youremail@idk.com"></input>
          </div>
          <div className="passwordInput">
            <input required onChange={this.handleChangePassword} type = "password" placeholder = "Password"></input>
          </div>
          <div className = "submitButton">
            <a href = "#workout" onClick = {this.handleSubmit}>Continue!</a>
          </div>
        </form>

      </div>
    )
  }


}
