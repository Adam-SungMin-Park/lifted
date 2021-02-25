import React from 'react';
import Home from './pages/home';
import NavBar from './pages/navbar';
import WorkOut from './pages/workout';
import Journal from './pages/journal';
import Food from './pages/food';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import AddWorkOut from './pages/addworkout';
import LandingPage from './pages/landingpage';
import { parseRoute } from './pages/index'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: parseRoute(window.location.hash),
      userId: window.localStorage.getItem("token"),
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
      .then(data => (data))
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
        this.setState({
          userId: data.userId
        })
      })
      .catch(err => { return err })
          window.location.reload();
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
    if (route.path === '') {
        return <LandingPage />;
    }

  }

  render(){
    const { route } = this.state;
    if( route.path !== '' ){

      return (
        <div id = "container">
          <NavBar userId={this.state.userId} />

          {this.renderPage()}
        </div>
      )
    }
    if( route.path === '') {
      return (
        <div id="container">
        {this.renderPage()}
        </div>
      )
    }
    }
  }
