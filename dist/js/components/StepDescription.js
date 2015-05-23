define(["exports", "module", "react", "utils/BEM", "storage/MazeStore"], function (exports, module, _react, _utilsBEM, _storageMazeStore) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _BEM = _interopRequireDefault(_utilsBEM);

  var b = _BEM["default"].b("StepDescription");

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
          this.state.algorithmState.description,
          _React["default"].createElement(
            "ul",
            null,
            _React["default"].createElement(
              "li",
              null,
              "Create the first row. No cells will be members of any set"
            ),
            _React["default"].createElement(
              "li",
              null,
              "Join any cells not members of a set to their own unique set"
            ),
            _React["default"].createElement(
              "li",
              null,
              "Create right-walls, moving from left to right:",
              _React["default"].createElement(
                "ul",
                null,
                _React["default"].createElement(
                  "li",
                  null,
                  "Randomly decide to add a wall or not",
                  _React["default"].createElement(
                    "ul",
                    null,
                    _React["default"].createElement(
                      "li",
                      null,
                      "If the current cell and the cell to the right are members of the same set, always create a wall between them. (This prevents loops)"
                    ),
                    _React["default"].createElement(
                      "li",
                      null,
                      "If you decide not to add a wall, union the sets to which the current cell and the cell to the right are members."
                    )
                  )
                )
              )
            ),
            _React["default"].createElement(
              "li",
              null,
              "Create bottom-walls, moving from left to right:",
              _React["default"].createElement(
                "ul",
                null,
                _React["default"].createElement(
                  "li",
                  null,
                  "Randomly decide to add a wall or not. Make sure that each set has at least one cell without a bottom-wall (This prevents isolations)",
                  _React["default"].createElement(
                    "ul",
                    null,
                    _React["default"].createElement(
                      "li",
                      null,
                      "If a cell is the only member of its set, do not create a bottom-wall"
                    ),
                    _React["default"].createElement(
                      "li",
                      null,
                      "If a cell is the only member of its set without a bottom-wall, do not create a bottom-wall"
                    )
                  )
                )
              )
            ),
            _React["default"].createElement(
              "li",
              null,
              "Decide to keep adding rows, or stop and complete the maze",
              _React["default"].createElement(
                "ul",
                null,
                _React["default"].createElement(
                  "li",
                  null,
                  "If you decide to add another row:",
                  _React["default"].createElement(
                    "ul",
                    null,
                    _React["default"].createElement(
                      "li",
                      null,
                      "Output the current row"
                    ),
                    _React["default"].createElement(
                      "li",
                      null,
                      "Remove all right walls"
                    ),
                    _React["default"].createElement(
                      "li",
                      null,
                      "Remove cells with a bottom-wall from their set"
                    ),
                    _React["default"].createElement(
                      "li",
                      null,
                      "Remove all bottom walls"
                    ),
                    _React["default"].createElement(
                      "li",
                      null,
                      "Continue from Step 2"
                    )
                  )
                )
              )
            ),
            _React["default"].createElement(
              "li",
              null,
              "If you decide to complete the maze",
              _React["default"].createElement(
                "ul",
                null,
                _React["default"].createElement(
                  "li",
                  null,
                  "Add a bottom wall to every cell"
                ),
                _React["default"].createElement(
                  "li",
                  null,
                  "Moving from left to right:",
                  _React["default"].createElement(
                    "ul",
                    null,
                    _React["default"].createElement(
                      "li",
                      null,
                      "If the current cell and the cell to the right are members of a different set:",
                      _React["default"].createElement(
                        "ul",
                        null,
                        _React["default"].createElement(
                          "li",
                          null,
                          "If the current cell and the cell to the right are members of a different set:"
                        ),
                        _React["default"].createElement(
                          "li",
                          null,
                          "Remove the right wall"
                        ),
                        _React["default"].createElement(
                          "li",
                          null,
                          "Union the sets to which the current cell and cell to the right are members."
                        ),
                        _React["default"].createElement(
                          "li",
                          null,
                          "Output the final row"
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return StepDescription;
  })(_React["default"].Component);

  module.exports = StepDescription;
});
//# sourceMappingURL=../../js/components/StepDescription.js.map