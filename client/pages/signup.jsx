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
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);

    }

    handleSubmit(){
      fetch('/api/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then(res => console.log(res))
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    handleChangeName(event){
      this.setState({
        name : event.target.value
      })
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
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} className = "signUpForm">
          <div className = "emailInput">
            <input onChange={this.handleChangeEmail} type = "email" placeholder = "youremail@idk.com"></input>
          </div>
          <div className="passwordInput">
            <input onChange={this.handleChangePassword} type = "password" placeholder = "Password"></input>
          </div>
          <div className="nameInput">
            <input onChange={this.handleChangeName} type = "text" placeholder ="name?"></input>
          </div>
          <div className = "submitButton">
            <button type = "submit">Continue!</button>
          </div>
        </form>

      </div>
    )
  }


}
