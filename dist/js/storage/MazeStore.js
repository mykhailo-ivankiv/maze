define(["exports", "reflux", "immutable", "utils/helper"], function (exports, _reflux, _immutable, _utilsHelper) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var marked0$0 = [renderMaze].map(regeneratorRuntime.mark);

  var _Reflux = _interopRequire(_reflux);

  var _Immutable = _interopRequire(_immutable);

  /**
   * Eller's Algorithm
   * RU - http://habrahabr.ru/post/176671/
   * EN - http://www.neocomputer.org/projects/eller.html
   */
  function renderMaze() {
    var mazeWidth = arguments[0] === undefined ? 15 : arguments[0];
    var mazeLength = arguments[1] === undefined ? 15 : arguments[1];

    var startSet, result, _loop, rowIndex;

    return regeneratorRuntime.wrap(function renderMaze$(context$1$0) {
      var _this = this;

      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          startSet = Array.apply(null, { length: mazeWidth }).map(function (el, i) {
            return { top: false, left: false, bottom: false, right: false, value: i };
          });
          result = [];
          _loop = regeneratorRuntime.mark(function callee$1$0(rowIndex) {
            var lengthOfSubset;
            return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  lengthOfSubset = 1;

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
                    cell.right = cellIndex === mazeWidth - 1 || cell.right;

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

                  result.push(_Immutable.fromJS(startSet).toJS());

                  context$2$0.next = 5;
                  return result;

                case 5:

                  startSet = _Immutable.fromJS(startSet).toJS().map(function (el, index, array) {
                    if (el.bottom) {
                      el.value = _utilsHelper.getFirstUniqueInt(array.map(function (el) {
                        return el.value;
                      }));
                    }
                    el.bottom = false;
                    el.right = false;
                    return el;
                  });

                case 6:
                case "end":
                  return context$2$0.stop();
              }
            }, callee$1$0, _this);
          });
          rowIndex = 0;

        case 4:
          if (!(rowIndex < mazeLength)) {
            context$1$0.next = 9;
            break;
          }

          return context$1$0.delegateYield(_loop(rowIndex), "t5", 6);

        case 6:
          rowIndex += 1;
          context$1$0.next = 4;
          break;

        case 9:

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

          return context$1$0.abrupt("return", result);

        case 11:
        case "end":
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  var MazeActions = _Reflux.createActions(["goToNextRow", "goToPrevRow"]);

  exports.MazeActions = MazeActions;
  var mazeGenerator = renderMaze();
  var maze = mazeGenerator.next().value;

  var MazeStore = _Reflux.createStore({
    pointer: 0,
    listenables: MazeActions,

    onGoToNextRow: function onGoToNextRow() {
      this.pointer += 1;
      if (maze.length < this.pointer) {
        maze = mazeGenerator.next().value;
      }
      this.trigger();
    },

    onGoToPrevRow: function onGoToPrevRow() {
      this.pointer -= 1;
      this.trigger();
    },

    getMaze: function getMaze() {
      return maze.slice(0, this.pointer);
    },

    getTotalProgress: function getTotalProgress() {
      return maze.length;
    },

    getActiveProgress: function getActiveProgress() {
      return this.pointer;
    }
  });
  exports.MazeStore = MazeStore;
});
//# sourceMappingURL=../../js/storage/MazeStore.js.map