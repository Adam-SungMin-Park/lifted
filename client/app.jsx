import React from 'react';
import Home from './pages/home';
import NavBar from './pages/navbar';
import WorkOut from './pages/workout';
import Journal from './pages/journal';

import AddWorkOut from './pages/addworkout';
import { parseRoute } from './pages/index'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.updateHash = this.updateHash.bind(this)
  }
  componentDidMount(){
    window.addEventListener('hashchange',(event)=>{
      this.setState({
        route: parseRoute(window.location.hash)
      })
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
      return <Home/>
    }
    if(route.path === 'workout'){
      return <WorkOut/>;
    }
    if(route.path === 'addworkout'){
      return <AddWorkOut updateHash={this.updateHash} />;
    }
    if(route.path === 'journal'){
      return <Journal/>;
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
