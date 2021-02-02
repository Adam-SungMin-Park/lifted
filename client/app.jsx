import React from 'react';
import Home from './pages/home';
import Navbar from './pages/navbar';
import WorkOut from './pages/workout';
import AppContext from './pages/app-context';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "main"
    };
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(props) {
    console.log(this.state.display)
    this.setState({
      display: event.target.textContent
    })
  }

  render(props) {

    if (this.state.display === "main"||this.state.display ==="home"){
    return (
      <div id = "container">
        <div id = "appNavBar">
        <Navbar handleClick = {this.handleClick}/>
        </div>
        <div id = "appHome">
        <Home />
        </div>
      </div>
    );
    }
    if(this.state.display ==="fitness_center" || "WorkOut"){
      return (
        <WorkOut handleClick = {this.handleClick}/>
      )
    }
  }

}
App.contextType = AppContext
