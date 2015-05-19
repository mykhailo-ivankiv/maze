import React from "react";
import BEM from "utils/BEM";

import {MazeStore, MazeActions} from "storage/MazeStore";

var b = BEM.b("maze");

class Maze extends React.Component {
  constructor (pref) {
    super();
    this.state = {
      maze: MazeStore.getMaze(),
      algorithmState : MazeStore.getAlgorithmState()
    };
  }

  onMazeChange () {
    this.setState({
      maze: MazeStore.getMaze(),
      algorithmState : MazeStore.getAlgorithmState()
    });
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
    var {activeRowIndex, activeCellIndex} = this.state.algorithmState;

    return (
      <div className={b()}>
        {maze.map((row, rowIndex) => <div className={b("row")}>
          {row.map((cell, cellIndex) => <div className = {b("cell",{
            active: activeRowIndex  === rowIndex && activeCellIndex === cellIndex,
            "sub-active" : activeRowIndex  === rowIndex && (activeCellIndex + 1) === cellIndex,
            top: cell.top,
            left: cell.left,
            bottom: cell.bottom,
            right: cell.right
           })}>{cell.value}</div>)}
        </div>)}
      </div>
    )
  };
}

export default Maze;

function *foo() {
  var pointer = 0
  yield pointer++;
}