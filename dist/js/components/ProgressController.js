define(["exports", "module", "react", "utils/BEM", "storage/MazeStore"], function (exports, module, _react, _utilsBEM, _storageMazeStore) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _BEM = _interopRequireDefault(_utilsBEM);

  var b = _BEM["default"].b("progress-controller");
  var f = _BEM["default"].b("form-element");

  var ProgressController = (function (_React$Component) {
    function ProgressController(pref) {
      _classCallCheck(this, ProgressController);

      _get(Object.getPrototypeOf(ProgressController.prototype), "constructor", this).call(this);
      this.state = {
        totalProgress: _storageMazeStore.MazeStore.getTotalProgress(),
        activeProgress: _storageMazeStore.MazeStore.getActiveProgress(),
        fullSize: 15
      };
    }

    _inherits(ProgressController, _React$Component);

    _createClass(ProgressController, [{
      key: "onMazeChange",
      value: function onMazeChange() {
        this.setState({
          totalProgress: _storageMazeStore.MazeStore.getTotalProgress(),
          activeProgress: _storageMazeStore.MazeStore.getActiveProgress()
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
        this.timer = setInterval(function () {
          return _storageMazeStore.MazeActions.goToNextRow();
        }, 1500);

        this.setState({ play: true });
      }
    }, {
      key: "pause",
      value: function pause() {
        clearTimeout(this.timer);
        this.setState({ play: false });
      }
    }, {
      key: "render",
      value: function render() {
        return _React["default"].createElement(
          "div",
          { className: b() },
          _React["default"].createElement(
            "button",
            { className: f("button"), onClick: this.prevMazeStep.bind(this) },
            _React["default"].createElement("i", { className: "fa fa-backward" })
          ),
          this.state.play ? _React["default"].createElement(
            "button",
            { className: f("button"), onClick: this.pause.bind(this) },
            _React["default"].createElement("i", { className: "fa fa-pause" })
          ) : _React["default"].createElement(
            "button",
            { className: f("button"), onClick: this.play.bind(this) },
            _React["default"].createElement("i", { className: "fa fa-play" })
          ),
          _React["default"].createElement(
            "button",
            { className: f("button"), onClick: this.nextMazeStep.bind(this) },
            _React["default"].createElement("i", { className: "fa fa-forward" })
          ),
          _React["default"].createElement("br", null),
          _React["default"].createElement(
            "div",
            { className: b("progress") },
            _React["default"].createElement("div", { style: { width: this.state.totalProgress * 100 / 15 + "%" }, className: b("total-progress") }),
            _React["default"].createElement("div", { style: { width: this.state.activeProgress * 100 / 15 + "%" }, className: b("active-position") })
          )
        );
      }
    }]);

    return ProgressController;
  })(_React["default"].Component);

  module.exports = ProgressController;
});
//# sourceMappingURL=../../js/components/ProgressController.js.map