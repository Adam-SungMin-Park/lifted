import React from 'react';
import Home from './pages/home';
import NavBar from './pages/navbar';
import WorkOut from './pages/workout';
import Journal from './pages/journal';
import Food from './pages/food';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import AddWorkOut from './pages/addworkout';
import { parseRoute } from './pages/index'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: parseRoute(window.location.hash),
      userId:"",
      email:"",
      password:""
    };
    this.updateHash = this.updateHash.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }
  componentDidMount(){
    window.addEventListener('hashchange',(event)=>{
      this.setState({
        route: parseRoute(window.location.hash)
      })
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
        this.setState({
          userId: data.userId
        })
        if (data === "nice try :) again") {
          alert(data)
        }
        else {
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

  updateHash(hash){
    this.setState({
      route:hash
    })
  }
  renderPage(){
    const { route } = this.state;
    if(route.path ==='user'){
      return <Home userId={this.state.userId}/>
    }
    if(route.path === 'workout'){
      return <WorkOut userId = {this.state.userId}/>;
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
  }

  render(){
    console.log(this.state)

    if(this.state.userId !==""){
      return (
        <>
          <NavBar userId={this.state.userId} />

          { this.renderPage()}
        </>
      )
    }
    else{
      return (
        <>
          <NavBar userId={this.state.userId} />
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
      </>
      )
    }
  }
}
