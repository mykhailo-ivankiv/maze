import React from "react";
import BEM from "utils/BEM";

var b = BEM.b("maze");

class Maze extends React.Component {
  constructor (pref) {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className={b()}>
        Maze!
      </div>
    )
  };
}

export default Maze;
