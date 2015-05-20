define(["exports", "module", "react", "utils/BEM", "storage/MazeStore"], function (exports, module, _react, _utilsBEM, _storageMazeStore) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _BEM = _interopRequireDefault(_utilsBEM);

  var b = _BEM["default"].b("step-descriuption");

  var StepDescription = (function (_React$Component) {
    function StepDescription(pref) {
      _classCallCheck(this, StepDescription);

      _get(Object.getPrototypeOf(StepDescription.prototype), "constructor", this).call(this);
      this.state = {
        algorithmState: _storageMazeStore.MazeStore.getAlgorithmState(),
        maze: _storageMazeStore.MazeStore.getMaze()
      };
    }

    _inherits(StepDescription, _React$Component);

    _createClass(StepDescription, [{
      key: "onMazeChange",
      value: function onMazeChange() {
        this.setState({
          maze: _storageMazeStore.MazeStore.getMaze(),
          algorithmState: _storageMazeStore.MazeStore.getAlgorithmState()
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.unsubscribe = [_storageMazeStore.MazeStore.listen(this.onMazeChange.bind(this))];
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unsubscribe.map(function (fn) {
          return fn();
        });
      }
    }, {
      key: "render",
      value: function render() {
        return _React["default"].createElement(
          "div",
          { className: b() },
          this.state.algorithmState.description
        );
      }
    }]);

    return StepDescription;
  })(_React["default"].Component);

  module.exports = StepDescription;
});
//# sourceMappingURL=../../js/components/StepDescription.js.map