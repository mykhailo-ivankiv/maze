import React from "react";
import BEM from "utils/BEM";

import {MazeStore, MazeActions} from "storage/MazeStore";

var b = BEM.b("maze");

class Maze extends React.Component {
  constructor (pref) {
    super();
    this.state = { maze: MazeStore.getMaze() };

    setInterval(() => {
      MazeActions.goToNextRow();
    }, 1500)
  }

  onMazeChange () {
    this.setState({ maze: MazeStore.getMaze() });
  }

  componentDidMount () {
    this.unsubscribe = [
      MazeStore.listen(this.onMazeChange.bind(this))
    ]
  }

  componentWillUnmount () {
    this.unsubscribe.map((fn)=> fn());
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
           })}>{cell.value}</div>)}
        </div>))}
      </div>
    )
  };
}

export default Maze;

function *foo() {
  var pointer = 0
  yield pointer++;
}