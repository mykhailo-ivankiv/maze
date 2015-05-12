import React from "react";
import BEM from "utils/BEM";

import Maze from "components/Maze"
import ProgressController from "components/ProgressController"


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
        <div className = {b("maze")}><Maze/></div>
      </div>
    )
  };
}

export default Layout;
