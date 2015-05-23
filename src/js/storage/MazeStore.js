import Reflux from "reflux";
import Immutable from "immutable";
import {getFirstUniqueInt, getRandomInt} from "utils/helper";

/**
 * Eller's Algorithm
 * RU - http://habrahabr.ru/post/176671/
 * EN - http://www.neocomputer.org/projects/eller.html
 */

var algorythmState;
function *renderMaze (mazeWidth = 15, mazeLength = 15) {
  let startSet = Array
                  .apply(null, {length: mazeWidth})
                  .map((el, i) => ({ top: true, left: false, bottom: false, right: false, value: i}));

  let result = Immutable.List();
  algorythmState = {description: "Create initial set"};

  for (let rowIndex=0; rowIndex < mazeLength; rowIndex += 1) { //set right border;
    result = result.push(startSet);
    algorythmState.activeRowIndex = rowIndex;
    yield result.toJS();

    let lengthOfSubset = 1;

    for (let cellIndex = 0; cellIndex < startSet.length; cellIndex +=1) {
      algorythmState.description = "Set right border";
      algorythmState.activeCellIndex = cellIndex;

      yield result.toJS();

      let cell = startSet[cellIndex];

      if (startSet[cellIndex + 1] !== undefined && startSet[cellIndex + 1].value === cell.value) {
        cell.right = true;
      } else if (Math.random() < 0.5 && startSet[cellIndex + 1] !== undefined) {
        startSet[cellIndex + 1].value = cell.value;
      } else {
        cell.right = true;
      }

      cell.left = cellIndex === 0;
      cell.right = (cellIndex === (mazeWidth - 1)) || cell.right;

      yield result.toJS();
    }

    for (let k = 0; k < startSet.length; k+=1) { //set bottom border;
      algorythmState.description = "Set bottom border";
      algorythmState.activeCellIndex = k;

      let el = startSet[k];
      if (startSet[k + 1] !== undefined && startSet[k + 1].value === el.value) {
        lengthOfSubset += 1;
      } else {
        let doorCount = getRandomInt(1, lengthOfSubset);

        for (let f = k; f > k - lengthOfSubset; f -= 1) {
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
      yield result.toJS();
    }

    yield result.toJS();

    startSet = Immutable.fromJS(startSet).toJS()
      .map((el,index, array) => {
        if (el.bottom) {
          el.value = getFirstUniqueInt(array.map(el => el.value));
        }
        el.top = false;
        el.bottom = false;
        el.right = false;
        return el;
      })
  }

  result.get(result.length - 1)
    .forEach((el, index, array)=>{
      el.bottom = true;

      if(array[index+1]) {
        console.log(el.value, array[index+1].value, array.map(el=>el.value));
      }

      if (array[index+1] && el.value !== array[index+1].value) {
        el.right = false;
        array[index+1].value = el.value;
      }

    });

  return result.toJS();
}


export var MazeActions = Reflux.createActions([
  "goToNextRow",
  "goToPrevRow"
]);

var mazeGenerator = renderMaze();
var maze = mazeGenerator.next().value;

export var MazeStore = Reflux.createStore({
  pointer : 0,
  listenables: MazeActions,

  onGoToNextRow() {
    this.pointer += 1;
    if (maze.length < this.pointer) {maze = mazeGenerator.next().value;}
    this.trigger();
  },

  onGoToPrevRow () {
    this.pointer -= 1;
    this.trigger();
  },

  getMaze () {
    return maze.slice(0, this.pointer);
  },

  getAlgorithmState() {
    return algorythmState;
  },

  getTotalProgress () {
    return maze.length;
  },

  getActiveProgress () {
    return this.pointer;
  }
});
