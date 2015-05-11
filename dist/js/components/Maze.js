define(["exports", "module", "react", "utils/BEM", "utils/helper"], function (exports, module, _react, _utilsBEM, _utilsHelper) {
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _React = _interopRequire(_react);

  var _BEM = _interopRequire(_utilsBEM);

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

        var MAZE_WIDTH = 13;
        var MAZE_LENGTH = 13;

        var startSet = Array.apply(null, { length: MAZE_WIDTH }).map(function (el, i) {
          return i;
        });
        var result = [];

        var _loop = function (i) {
          startSet.forEach(function (el, i) {
            if (Math.random() < 0.5 && startSet[i - 1] !== undefined) {
              startSet[i] = startSet[i - 1];
            }
          });

          var bottomBorders = _this2.getBottomBordersArray(startSet);

          result.push(startSet.map(function (el, j) {
            return {
              top: i === 0,
              left: j === 0 || startSet[el - 1] !== undefined && el !== startSet[j - 1],
              bottom: i === MAZE_LENGTH - 1 || bottomBorders[j],
              right: j === MAZE_WIDTH - 1,
              value: el
            };
          }));

          startSet = startSet.map(function (el, i) {
            return bottomBorders[i] ? i : el;
          });

          console.log(JSON.stringify(startSet));
        };

        for (var i = 0; i < MAZE_LENGTH; i += 1) {
          _loop(i);
        }

        return result;
      }
    }, {
      key: "getBottomBordersArray",
      value: function getBottomBordersArray(startSet) {
        var setLength = 1;
        var bottomBorders = [];

        startSet.forEach(function (el, k) {
          if (startSet[k + 1] !== undefined && startSet[k + 1] === el) {
            setLength += 1;
          } else {
            (function () {

              var doorCount = 1; //getRandomInt(1, setLength);
              bottomBorders = bottomBorders.concat(Array.apply(null, { length: setLength }).map(function (el, i, array) {
                if (array.length - i === doorCount) {
                  doorCount -= 1;
                  return false;
                } else if (doorCount === 0) {
                  return true;
                } else {
                  if (Math.random() > 0.3) {
                    doorCount -= 1;
                    return false;
                  } else {
                    return true;
                  }
                }
              }));

              setLength = 1;
            })();
          }
        });

        return bottomBorders;
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
          })
        );
      }
    }]);

    return Maze;
  })(_React.Component);

  module.exports = Maze;
});