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
      </div>
    )    
  };
}

export default StepDescription;
