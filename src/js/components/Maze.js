import React from "react";
import BEM from "utils/BEM";

var b = BEM.b("maze");

class Maze extends React.Component {
  constructor (pref) {
    super();
    this.state = {
      maze: [
        [
          { top: true, left: true,  bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: true, bottom: false, right: false},
          { top: true, left: false, bottom: true, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: false},
          { top: true, left: false, bottom: false, right: true }
        ],
        [
          { top: false, left: true,  bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: true, bottom: false, right: false},
          { top: false, left: false, bottom: true, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: false},
          { top: false, left: false, bottom: false, right: true }
        ]

      ]
    };
  }

  render () {
    var {maze} = this.state;
    return (
      <div className={b()}>

        {maze.map((row => <div className={b("row")}>
          {row.map((cell, index) => <div className = {b("cell",{
            top: cell.top,
            left: cell.left,
            bottom: cell.bottom,
            right: cell.right
           })}>{index}</div>)}
        </div>))}
      </div>
    )
  };
}

export default Maze;
