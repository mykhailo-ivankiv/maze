define(["exports", "module", "react", "utils/BEM", "storage/MazeStore"], function (exports, module, _react, _utilsBEM, _storageMazeStore) {
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _React = _interopRequire(_react);

  var _BEM = _interopRequire(_utilsBEM);

  var b = _BEM.b("progress-controller");
  var f = _BEM.b("form-element");

  var ProgressController = (function (_React$Component) {
    function ProgressController(pref) {
      _classCallCheck(this, ProgressController);

      _get(Object.getPrototypeOf(ProgressController.prototype), "constructor", this).call(this);
      this.state = {};
    }

    _inherits(ProgressController, _React$Component);

    _createClass(ProgressController, [{
      key: "nextMazeStep",
      value: function nextMazeStep() {
        _storageMazeStore.MazeActions.goToNextRow();
      }
    }, {
      key: "prevMazeStep",
      value: function prevMazeStep() {
        _storageMazeStore.MazeActions.goToPrevRow();
      }
    }, {
      key: "play",
      value: function play() {
        this.setState({ play: true });
      }
    }, {
      key: "pause",
      value: function pause() {
        this.setState({ play: false });
      }
    }, {
      key: "render",
      value: function render() {
        return _React.createElement(
          "div",
          { className: b() },
          _React.createElement(
            "button",
            { className: f("button"), onClick: this.prevMazeStep.bind(this) },
            _React.createElement("i", { className: "fa fa-backward" })
          ),
          this.state.play ? _React.createElement(
            "button",
            { className: f("button"), onClick: this.pause.bind(this) },
            _React.createElement("i", { className: "fa fa-pause" })
          ) : _React.createElement(
            "button",
            { className: f("button"), onClick: this.play.bind(this) },
            _React.createElement("i", { className: "fa fa-play" })
          ),
          _React.createElement(
            "button",
            { className: f("button"), onClick: this.nextMazeStep.bind(this) },
            _React.createElement("i", { className: "fa fa-forward" })
          ),
          _React.createElement(
            "div",
            { className: b("progress") },
            _React.createElement("div", { className: b("total-progress") }),
            _React.createElement("div", { className: b("active-position") }),
            _React.createElement("div", { className: b("slider") })
          )
        );
      }
    }]);

    return ProgressController;
  })(_React.Component);

  module.exports = ProgressController;
});
//# sourceMappingURL=../../js/components/ProgressController.js.map