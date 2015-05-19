import React from "react";
import BEM from "utils/BEM";

import Maze from "components/Maze"
import ProgressController from "components/ProgressController"
import StepDescription from "components/StepDescription"


var b = BEM.b("layout");

class Layout extends React.Component {
  constructor (pref) {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className={b()}>
        <div className = {b("tools")}><ProgressController/></div>
        <div className = {b("description")}><StepDescription/></div>
        <div className = {b("maze")}><Maze/></div>
      </div>
    )
  };
}

export default Layout;
