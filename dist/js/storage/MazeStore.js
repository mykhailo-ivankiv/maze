define(["exports", "reflux", "immutable", "utils/helper"], function (exports, _reflux, _immutable, _utilsHelper) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var marked0$0 = [renderMaze].map(regeneratorRuntime.mark);

  var _Reflux = _interopRequireDefault(_reflux);

  var _Immutable = _interopRequireDefault(_immutable);

  /**
   * Eller's Algorithm
   * RU - http://habrahabr.ru/post/176671/
   * EN - http://www.neocomputer.org/projects/eller.html
   */

  var algorythmState;
  function renderMaze() {
    var mazeWidth = arguments[0] === undefined ? 15 : arguments[0];
    var mazeLength = arguments[1] === undefined ? 15 : arguments[1];
    var startSet, result, rowIndex, lengthOfSubset, cellIndex, cell, k, el, doorCount, f;
    return regeneratorRuntime.wrap(function renderMaze$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          startSet = Array.apply(null, { length: mazeWidth }).map(function (el, i) {
            return { top: true, left: false, bottom: false, right: false, value: i };
          });
          result = _Immutable["default"].List();

          algorythmState = { description: "Create initial set" };

          rowIndex = 0;

        case 4:
          if (!(rowIndex < mazeLength)) {
            context$1$0.next = 42;
            break;
          }

          //set right border;
          result = result.push(startSet);
          algorythmState.activeRowIndex = rowIndex;
          context$1$0.next = 9;
          return result.toJS();

        case 9:
          lengthOfSubset = 1;
          cellIndex = 0;

        case 11:
          if (!(cellIndex < startSet.length)) {
            context$1$0.next = 25;
            break;
          }

          algorythmState.description = "Set right border";
          algorythmState.activeCellIndex = cellIndex;

          context$1$0.next = 16;
          return result.toJS();

        case 16:
          cell = startSet[cellIndex];

          if (startSet[cellIndex + 1] !== undefined && startSet[cellIndex + 1].value === cell.value) {
            cell.right = true;
          } else if (Math.random() < 0.5 && startSet[cellIndex + 1] !== undefined) {
            startSet[cellIndex + 1].value = cell.value;
          } else {
            cell.right = true;
          }

          cell.left = cellIndex === 0;
          cell.right = cellIndex === mazeWidth - 1 || cell.right;

          context$1$0.next = 22;
          return result.toJS();

        case 22:
          cellIndex += 1;
          context$1$0.next = 11;
          break;

        case 25:
          k = 0;

        case 26:
          if (!(k < startSet.length)) {
            context$1$0.next = 36;
            break;
          }

          //set bottom border;
          algorythmState.description = "Set bottom border";
          algorythmState.activeCellIndex = k;

          el = startSet[k];

          if (startSet[k + 1] !== undefined && startSet[k + 1].value === el.value) {
            lengthOfSubset += 1;
          } else {
            doorCount = (0, _utilsHelper.getRandomInt)(1, lengthOfSubset);

            for (f = k; f > k - lengthOfSubset; f -= 1) {
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
          context$1$0.next = 33;
          return result.toJS();

        case 33:
          k += 1;
          context$1$0.next = 26;
          break;

        case 36:
          context$1$0.next = 38;
          return result.toJS();

        case 38:

          startSet = _Immutable["default"].fromJS(startSet).toJS().map(function (el, index, array) {
            if (el.bottom) {
              el.value = (0, _utilsHelper.getFirstUniqueInt)(array.map(function (el) {
                return el.value;
              }));
            }
            el.top = false;
            el.bottom = false;
            el.right = false;
            return el;
          });

        case 39:
          rowIndex += 1;
          context$1$0.next = 4;
          break;

        case 42:

          result.get(result.length - 1).forEach(function (el, index, array) {
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

          return context$1$0.abrupt("return", result.toJS());

        case 44:
        case "end":
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  var MazeActions = _Reflux["default"].createActions(["goToNextRow", "goToPrevRow"]);

  exports.MazeActions = MazeActions;
  var mazeGenerator = renderMaze();
  var maze = mazeGenerator.next().value;

  var MazeStore = _Reflux["default"].createStore({
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

    getAlgorithmState: function getAlgorithmState() {
      return algorythmState;
    },

    getTotalProgress: function getTotalProgress() {
      return maze.length;
    },

    getActiveProgress: function getActiveProgress() {
      return Math.round(this.pointer / 48);
    }
  });
  exports.MazeStore = MazeStore;
});
//# sourceMappingURL=../../js/storage/MazeStore.js.map