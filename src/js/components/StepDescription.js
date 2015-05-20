import React from "react";
import BEM from "utils/BEM";
import {MazeStore, MazeActions} from "storage/MazeStore";

var b = BEM.b("step-descriuption");

class StepDescription extends React.Component {
  constructor (pref) {
    super();
    this.state = {
      algorithmState: MazeStore.getAlgorithmState(),
      maze: MazeStore.getMaze()
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
    return (
      <div className={b()}>
        {this.state.algorithmState.description}

        <ul>
          <li>Create the first row. No cells will be members of any set</li>

          <li>Join any cells not members of a set to their own unique set</li>

          <li>
            Create right-walls, moving from left to right:
            <ul>
              <li>
                Randomly decide to add a wall or not
                <ul>
                  <li>If the current cell and the cell to the right are members of the same set, always create a wall between them. (This prevents loops)</li>
                  <li>If you decide not to add a wall, union the sets to which the current cell and the cell to the right are members.</li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            Create bottom-walls, moving from left to right:
            <ul>
              <li>
                Randomly decide to add a wall or not. Make sure that each set has at least one cell without a
                bottom-wall (This prevents isolations)
                <ul>
                  <li>If a cell is the only member of its set, do not create a bottom-wall</li>
                  <li>If a cell is the only member of its set without a bottom-wall, do not create a bottom-wall</li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            Decide to keep adding rows, or stop and complete the maze
            <ul>
              <li>If you decide to add another row:
                <ul>
                  <li>Output the current row</li>
                  <li>Remove all right walls</li>
                  <li>Remove cells with a bottom-wall from their set</li>
                  <li>Remove all bottom walls</li>
                  <li>Continue from Step 2</li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            If you decide to complete the maze
            <ul>
              <li>Add a bottom wall to every cell</li>
              <li>
                Moving from left to right:
                <ul>
                  <li>
                    If the current cell and the cell to the right are members of a different set:
                    <ul>
                      <li>If the current cell and the cell to the right are members of a different set:</li>
                      <li>Remove the right wall</li>
                      <li>Union the sets to which the current cell and cell to the right are members.</li>
                      <li>Output the final row</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    )    
  };
}

export default StepDescription;
