import React from 'react';
import Home from './pages/home';
import NavBar from './pages/navbar';
import WorkOut from './pages/workout';

import AddWorkOut from './pages/addworkout';
import { parseRoute } from './pages/index'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: parseRoute(window.location.hash)
    };

    //this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount(){
    window.addEventListener('hashchange',(event)=>{
      this.setState({
        route: parseRoute(window.location.hash)
      })
    })
    console.log(this.state.route)
  }

  renderPage(){
    const { route } = this.state;
    if(route.path ==='user'){
      return <Home/>
    }
    if(route.path === 'workout'){
      return <WorkOut/>;
    }
    if(route.path === 'addworkout'){
      return <AddWorkOut />;
    }
  }

  render(){
    return(
      <>
    <NavBar/>
    { this.renderPage() }
    </>
    )
  }
}
