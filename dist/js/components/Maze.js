define(["exports", "module", "react", "utils/BEM", "immutable", "utils/helper"], function (exports, module, _react, _utilsBEM, _immutable, _utilsHelper) {
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _React = _interopRequire(_react);

  var _BEM = _interopRequire(_utilsBEM);

  var _Immutable = _interopRequire(_immutable);

  var b = _BEM.b("maze");

  var Maze = (function (_React$Component) {
    function Maze(pref) {
      _classCallCheck(this, Maze);

      _get(Object.getPrototypeOf(Maze.prototype), "constructor", this).call(this);
      this.state = {
        maze: this.renderMaze()
      };
    }

    _inherits(Maze, _React$Component);

    _createClass(Maze, [{
      key: "renderMaze",

      /**
       * Eller's Algorithm
       * RU - http://habrahabr.ru/post/176671/
       * EN - http://www.neocomputer.org/projects/eller.html
       */

      value: function renderMaze() {
        var _this2 = this;

        var MAZE_WIDTH = 15;
        var MAZE_LENGTH = 15;

        var startSet = Array.apply(null, { length: MAZE_WIDTH }).map(function (el, i) {
          return {
            top: false,
            left: false,
            bottom: false,
            right: false,
            value: i
          };
        });
        var result = [];

        var _loop = function (rowIndex) {
          var lengthOfSubset = 1;

          startSet.map(function (cell, cellIndex) {
            if (startSet[cellIndex + 1] !== undefined && startSet[cellIndex + 1].value === cell.value) {
              cell.right = true;
            } else if (Math.random() < 0.5 && startSet[cellIndex + 1] !== undefined) {
              startSet[cellIndex + 1].value = cell.value;
            } else {
              cell.right = true;
            }

            cell.top = rowIndex === 0;
            cell.left = cellIndex === 0;
            cell.right = cellIndex === MAZE_WIDTH - 1 || cell.right;

            return cell;
          }).map(function (el, k) {
            if (startSet[k + 1] !== undefined && startSet[k + 1].value === el.value) {
              lengthOfSubset += 1;
            } else {
              var doorCount = _utilsHelper.getRandomInt(1, lengthOfSubset);

              for (var f = k; f > k - lengthOfSubset; f -= 1) {
                if (doorCount === 0) {
                  startSet[f].bottom = true;
                } else if (doorCount === f - k + lengthOfSubset) {
                  doorCount -= 1;
                  startSet[f].bottom = false;
                } else if (Math.random() > 0.5) {
                  startSet[f].bottom = true;
                } else {
                  doorCount -= 1;
                  startSet[f].bottom = false;
                }
              }

              lengthOfSubset = 1;
            }
          });

          result.push(startSet);

          startSet = _Immutable.fromJS(startSet).toJS().map(function (el, index, array) {
            if (el.bottom) {
              el.value = _this2.getFirstUniqueInt(array.map(function (el) {
                return el.value;
              }));
            }
            el.bottom = false;
            el.right = false;
            return el;
          });
        };

        for (var rowIndex = 0; rowIndex < MAZE_LENGTH; rowIndex += 1) {
          _loop(rowIndex);
        }

        result[result.length - 1].forEach(function (el, index, array) {
          el.bottom = true;

          if (array[index + 1]) {
            console.log(el.value, array[index + 1].value, array.map(function (el) {
              return el.value;
            }));
          }

          if (array[index + 1] && el.value !== array[index + 1].value) {
            el.right = false;
            array[index + 1].value = el.value;
          }
        });

        return result;
      }
    }, {
      key: "getFirstUniqueInt",
      value: function getFirstUniqueInt(arr) {
        var result = 0;

        while (arr.indexOf(result) >= 0) {
          result += 1;
        }

        return result;
      }
    }, {
      key: "newMaze",
      value: function newMaze() {
        this.setState({ maze: this.renderMaze() });
      }
    }, {
      key: "render",
      value: function render() {
        var maze = this.state.maze;

        return _React.createElement(
          "div",
          { className: b() },
          maze.map(function (row) {
            return _React.createElement(
              "div",
              { className: b("row") },
              row.map(function (cell, index) {
                return _React.createElement(
                  "div",
                  { className: b("cell", {
                      top: cell.top,
                      left: cell.left,
                      bottom: cell.bottom,
                      right: cell.right
                    }) },
                  cell.value
                );
              })
            );
          }),
          _React.createElement(
            "button",
            { style: { marginTop: 50 }, onClick: this.newMaze.bind(this) },
            "Rerender"
          )
        );
      }
    }]);

    return Maze;
  })(_React.Component);

  module.exports = Maze;
});
//# sourceMappingURL=../../js/components/Maze.js.map