import React from 'react';

export default function Navbar(props) {
  return (
    <div>
      <div id = "navBarContainer">
        <div id = "navBarWorkOut">
          <span class="material-icons md-60">
            fitness_center
          </span>
          <div id = "navBarText">
            Workout
          </div>
        </div>
        <div id="navBarPlans">
          <span class="material-icons md-60">
            folder_special
          </span>
          <div id ="navBarText">
            Plans
          </div>
        </div>
        <div id="navBarJournal">
          <span class="material-icons md-60">
            text_snippet
          </span>
          <div id="navBarText">
            Journal
          </div>
        </div>
        <div id="navBarUser">
          <span class="material-icons md-60">
            account_circle
          </span>
          <div id="navBarText">
            User
          </div>
        </div>
      </div>
    </div>
  );
}
