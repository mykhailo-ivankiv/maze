define(["exports", "module", "react", "utils/BEM", "components/Maze", "components/ProgressController", "components/StepDescription"], function (exports, module, _react, _utilsBEM, _componentsMaze, _componentsProgressController, _componentsStepDescription) {
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _React = _interopRequire(_react);

  var _BEM = _interopRequire(_utilsBEM);

  var _Maze = _interopRequire(_componentsMaze);

  var _ProgressController = _interopRequire(_componentsProgressController);

  var _StepDescription = _interopRequire(_componentsStepDescription);

  var b = _BEM.b("layout");

  var Layout = (function (_React$Component) {
    function Layout(pref) {
      _classCallCheck(this, Layout);

      _get(Object.getPrototypeOf(Layout.prototype), "constructor", this).call(this);
      this.state = {};
    }

    _inherits(Layout, _React$Component);

    _createClass(Layout, [{
      key: "render",
      value: function render() {
        return _React.createElement(
          "div",
          { className: b() },
          _React.createElement(
            "div",
            { className: b("tools") },
            _React.createElement(_ProgressController, null)
          ),
          _React.createElement(
            "div",
            { className: b("description") },
            _React.createElement(_StepDescription, null)
          ),
          _React.createElement(
            "div",
            { className: b("maze") },
            _React.createElement(_Maze, null)
          )
        );
      }
    }]);

    return Layout;
  })(_React.Component);

  module.exports = Layout;
});
//# sourceMappingURL=../../js/components/Layout.js.map