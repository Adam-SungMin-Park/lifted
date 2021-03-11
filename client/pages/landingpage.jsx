import React from 'react';

export default class LandingPage extends React.Component {
render(){
  return(
    <div className="container">
      <h1>Welcome to "Lifted"!</h1>
      <h3><em>Lifted is an application for people who want to track their fitness journey. Please feel free to play with it, and let me know how you think!</em></h3>
      <div className = "demoButtonPlace">
        <a className="demoButton" href ="#signin">Try it out on Demo!</a>
      </div>
    </div>
  )
}

}
