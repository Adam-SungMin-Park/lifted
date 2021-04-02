import React from 'react'
import WorkOut from './workout';


export default class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      email:"",
      password:"",
      userId:[],
      view:true
    }
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.viewChange = this.viewChange.bind(this);
  }

  viewChange(){
    this.setState({
      view: !this.state.view
    })

  }

  handleSubmit(){
    fetch('/api/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {return(res.json())})
      .then(data => {
        let test = [];
        data.userId = test[0]
        }
      )
      .catch(err => { return err })


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
  if(this.state.view === true){
    return(
      <div className="signInPage">
        <h1><a href="#signup" onClick = {this.viewChange}>Sign Up</a>/Sign in</h1>
        <form className="signInForm">
          <div className="emailInput">
            <input onChange={this.handleChangeEmail} type="email" placeholder="youremail@idk.com"></input>
          </div>
          <div className="passwordInput">
            <input onChange={this.handleChangePassword} type="password" placeholder="Password"></input>
          </div>
          <div className="submitButton">
            <a href="#workout" onClick={this.handleSubmit}>Log In</a>
          </div>
        </form>
      </div>
    )
  }
  if(this.state.view === false){
    return(

      <div className="signUpPage">
        <h1>Sign Up/ <a href="#signin" onClick ={this.viewChange}>Sign in</a></h1>
        <form className="signUpForm">
          <div className="emailInput">
            <input required onChange={this.handleChangeEmail} type="email" placeholder="youremail@idk.com"></input>
          </div>
          <div className="passwordInput">
            <input required onChange={this.handleChangePassword} type="password" placeholder="Password"></input>
          </div>
          <div className="submitButton">
            <a href="#workout" onClick={this.handleSubmit}>Continue</a>
          </div>
        </form>

      </div>
    )
  }
}
}
