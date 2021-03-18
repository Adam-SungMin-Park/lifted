import React, { Component } from 'react';

export default class SignUp extends React.Component {

    constructor(props){
      super(props)
      this.state ={
        userId:"",
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

      }).then(res =>{return(res)})
        .then(data => {return(
          this.setState({
            userId:data.userId
          }))})
        .catch(err => { return err })
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
