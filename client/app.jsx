import React from 'react';
import Home from './pages/home';
import NavBar from './pages/navbar';
import WorkOut from './pages/workout';
import Journal from './pages/journal';
import Food from './pages/food';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
//import AddWorkOut from './pages/addworkout';
import LandingPage from './pages/landingpage';
import WorkoutOverView from './components/workout';
import AddWorkOut from './components/addworkout';
import { parseRoute } from './pages/index'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: parseRoute(window.location.hash),
      userId: window.localStorage.getItem('token'),
      email:"",
      password:"",
      view:true
    };
    this.updateHash = this.updateHash.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.viewChange = this.viewChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }
  componentDidMount(){
    window.addEventListener('hashchange',(event)=>{
      this.setState({
        route: parseRoute(window.location.hash)
      })
    })

  }
  handleRegistration(){
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => (res))
      .then(data => (
        this.setState({
          userId:data.userId
        })))
      .catch(err => { return err })
  }

  viewChange () {
    this.setState({
      view:!this.state.view
    })
  }
  handleSubmit() {
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(data => {
        if(!data){
          return ""
        }
        else{
          this.setState({
            userId: data.userId
          })
        window.localStorage.setItem('token',data.userId)
        }
      })
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

  updateHash(hash){
    this.setState({
      route:hash
    })
    this.location.reload()
  }
  renderPage(){

    const { route } = this.state;

    if(route.path === 'workout'){
      return <WorkoutOverView userId = {this.state.userId}/>;
    }
    if(route.path === 'addworkout'){
      return <AddWorkOut userId={this.state.userId} updateHash={this.updateHash} />;
    }
    if(route.path === 'journal'){
      return <Journal userId={this.state.userId} />;
    }
    if(route.path === 'food'){
      return <Food userId={this.state.userId} />;
    }
    if(route.path === 'signup'){
      return <SignUp userId={this.state.userId} />;
    }
    if (route.path === 'signin') {
      return <SignIn userId={this.state.userId} />;
    }
    if (route.path === '') {
        return <LandingPage />;
    }

  }

  render(){
    const { route } = this.state;
    if (route.path !== '' && route.path !== 'signup' && route.path !== 'signin' && route.path !== 'signedin' ){
      return (
        <div className= "container-fluid">
          <div className = "wrapper">
          <NavBar userId={this.state.userId} />
          {this.renderPage()}
          </div>
        </div>
      )
    }
    if( route.path === '') {
      return (
        <div className="container-fluid">
          <div className ="wrapper">
            {this.renderPage()}
          </div>
        </div>
      )
    }
    if(route.path === 'signup') {
      return(
        <div className="container-fluid">

          <div className="signUpPage">
            <h1>Sign Up/ <a href="#signin" onClick={this.viewChange}>Sign in</a></h1>
            <form className="signUpForm">
              <div className="emailInput">
                <input required onChange={this.handleChangeEmail} type="email" placeholder="youremail@idk.com"></input>
              </div>
              <div className="passwordInput">
                <input required onChange={this.handleChangePassword} type="password" placeholder="Password"></input>
              </div>
              <div className="submitButton">
                <a href="#workout" onClick={this.handleSubmit}>Continue!</a>
              </div>
            </form>
          </div>
        </div>
      )
    }
    if(route.path === 'signin') {
      return (
        <div className="container-fluid">

          <div className="signInPage">
            <h1><a href="#signup" onClick={this.viewChange}>Sign Up</a>/Sign in</h1>
            <form className="signInForm">
              <div className="emailInput">
                <input onChange={this.handleChangeEmail} type="email" placeholder="youremail@idk.com"></input>
              </div>
              <div className="passwordInput">
                <input onChange={this.handleChangePassword} type="password" placeholder="Password"></input>
              </div>
              <div className="submitButton">
                <a href="#signedin" onClick={this.handleSubmit}>Log In</a>
              </div>
            </form>
          </div>
        </div>
      )
    }
    if(route.path === 'signedin' && this.state.userId !== "undefined") {
      return (
        <div className="container-fluid">
          <NavBar userId={this.state.userId} />
          <div className="signedInPage">
            <h1>
            Welcome user ID {this.state.userId}
            </h1>
          </div>
        </div>
      )
    }
    if(route.path === 'signedin' && this.state.userId === "undefined") {
      return(
        <div className="container-fluid">

          <div className="signedInPage">
            <h1>
              Log in Failed. <a href = "#signin">Retry.</a>
            </h1>
          </div>
        </div>
      )
    }
    }
  }
