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
<<<<<<< HEAD
      }).then(res => res.json())
        .then(data => {return ((data)) })
        .catch(err => { return ((err)) })
    }
=======
      }).then(res =>{return(res)})
        .then(data => {return(data)})
        .catch(err => { return err })
        }
>>>>>>> 8cabd617fbbd09fa46fcb0cb3b99e1b4f6066a2b



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
