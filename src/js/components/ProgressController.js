import React from "react/addons";
import BEM from "utils/BEM";

var b = BEM.b("progress-controller");

class ProgressController extends React.Component {
  constructor (pref) {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className={b()}>
        Progress Controller
      </div>
    )
  };
}

export default ProgressController;
