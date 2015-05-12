import React from "react";
import BEM from "utils/BEM";
import {MazeStore, MazeActions} from "storage/MazeStore";


var b = BEM.b("progress-controller");
var f = BEM.b("form-element")

class ProgressController extends React.Component {
  constructor (pref) {
    super();
    this.state = {};
  }

  nextMazeStep () { MazeActions.goToNextRow(); }
  prevMazeStep () { MazeActions.goToPrevRow(); }

  play() {this.setState({play: true})}
  pause() {this.setState({play: false})}

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
          <div className={b("total-progress")}></div>
          <div className={b("active-position")}></div>
          <div className={b("slider")}></div>
        </div>
      </div>
    )
  };
}

export default ProgressController;
