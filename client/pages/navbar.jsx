import React from 'react';
import { render } from 'react-dom';
export default class NavBar extends React.Component{

  constructor(props){
    super(props)
    this.state= {
      userId: this.props.userId,
      view:"no"
    }
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    document.querySelector('.navbar-collapse').className = 'navbar-collapse collapse'
  }

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Lifted</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#workout" onClick = {this.handleClick}>WorkOut</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#food" onClick={this.handleClick}>Food</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#journal" onClick={this.handleClick}>Body Weight</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
