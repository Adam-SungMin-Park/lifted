import React from 'react';
import { render } from 'react-dom';
//import WorkOut from './workout';
//import App from '../app';

export default class NavBar extends React.Component{

  constructor(props){

    super(props)
    this.state= {
      userId: this.props.userId,
      view:"no"
    }
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleReload = this.handleReload.bind(this)

  }

  handleReload(){
    window.location.reload()
  }

  componentDidMount(){
    if(this.state.userId !==null){
      this.setState({
        view:"yes"
      })
    }
  }
  handleSignOut(){
    window.localStorage.removeItem("token")
    this.setState({
      userId: 0,
      view:"no"
    })
    window.location.reload();


  }



  render(){

  return (
    <div className = "wrapper">
      <header className ="nav-header">
        <nav>
          <ul>
            <li>
              <a className="tab" href="#workout"><span className="material-icons md-60">fitness_center</span>Workout</a>
            </li>
            <li>
              <a className="tab " href="#food"><span className="material-icons md-60">restaurant_menu</span>Food</a>
            </li>
            <li>
              <a className="tab " href="#journal"><span className="material-icons md-60">text_snippet</span>Weight</a>
            </li>

          </ul>
        </nav>


      </header>
    </div>

  );

}
}
