import React from "react";
import BEM from "utils/BEM";
import {MazeStore, MazeActions} from "storage/MazeStore";


var b = BEM.b("progress-controller");
var f = BEM.b("form-element")

class ProgressController extends React.Component {
  constructor (pref) {
    super();
    this.state = {
      totalProgress: MazeStore.getTotalProgress(),
      activeProgress: MazeStore.getActiveProgress(),
      fullSize: 15
    };
  }

  onMazeChange () {
    this.setState({
      totalProgress: MazeStore.getTotalProgress(),
      activeProgress: MazeStore.getActiveProgress(),
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

  nextMazeStep () { MazeActions.goToNextRow(); }
  prevMazeStep () { MazeActions.goToPrevRow(); }

  play() {
    this.timer = setInterval(() => MazeActions.goToNextRow(), 1500);

    this.setState({play: true})
  }

  pause() {
    clearTimeout(this.timer);
    this.setState({play: false})
  }

  render () {
    return (
      <div className={b()}>
        <button className={f("button")} onClick = {this.prevMazeStep.bind(this)}><i className="fa fa-backward"/></button>

        {this.state.play
          ? <button className={f("button")} onClick={this.pause.bind(this)}><i className = "fa fa-pause"/></button>
          : <button className={f("button")} onClick={this.play.bind(this)} ><i className = "fa fa-play"/></button>
        }


        <button className={f("button")} onClick = {this.nextMazeStep.bind(this)}><i className="fa fa-forward"/></button>
        <div className={b("progress")}>
          <div style={{width: ((this.state.totalProgress * 100)/ 15) + "%"}} className={b("total-progress")}></div>
          <div style={{width: ((this.state.activeProgress * 100)/ 15) + "%"}} className={b("active-position")}></div>
        </div>
      </div>
    )
  };
}

export default ProgressController;
