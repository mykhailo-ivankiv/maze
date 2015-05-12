import React from "react/addons";
import BEM from "utils/BEM";

var b = BEM.b("layout");

class Layout extends React.Component {
  constructor (pref) {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className={b()}>
        Layout
      </div>
    )
  };
}

export default Layout;
