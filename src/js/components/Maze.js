import React from "react";
import BEM from "utils/BEM";
import {getRandomInt} from "utils/helper";

var b = BEM.b("maze");

class Maze extends React.Component {
  constructor (pref) {
    super();
    this.state = {
      maze: this.renderMaze()
    };
  }

  /**
   * Eller's Algorithm
   * RU - http://habrahabr.ru/post/176671/
   * EN - http://www.neocomputer.org/projects/eller.html
   */

  renderMaze () {
    const MAZE_WIDTH = 13;
    const MAZE_LENGTH = 13;

    let startSet = Array.apply(null, {length: MAZE_WIDTH}).map((el, i)=> i);
    let result = [];

    for (let i=0; i < MAZE_LENGTH; i += 1) {
      startSet.forEach((el, i) => {
        if (Math.random() < 0.5 && startSet[i-1] !== undefined) { startSet[i] = startSet[i-1]; }
      });

      let bottomBorders = this.getBottomBordersArray(startSet);

      result.push(startSet.map((el, j) => ({
        top: i === 0,
        left: j === 0 || (startSet[el - 1] !== undefined && el !== startSet[j - 1]),
        bottom: i === (MAZE_LENGTH - 1) || bottomBorders[j],
        right: j === (MAZE_WIDTH - 1),
        value: el
      })));

      startSet = startSet.map((el, i) => {
        return bottomBorders[i] ? i : el;
      });

      console.log(JSON.stringify(startSet));
    }

    return result;
  }

  getBottomBordersArray (startSet) {
    let setLength = 1;
    let bottomBorders = [];

    startSet.forEach((el, k) => {
      if (startSet[k+1] !== undefined && startSet[k+1] === el) {
        setLength += 1;
      } else {

        let doorCount = 1 //getRandomInt(1, setLength);
        bottomBorders = bottomBorders.concat(Array
          .apply(null, {length: setLength})
          .map((el, i, array) => {
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
      }
    });

    return bottomBorders;
  }

  render () {
    var {maze} = this.state;
    return (
      <div className={b()}>

        {maze.map((row => <div className={b("row")}>
          {row.map((cell, index) => <div className = {b("cell",{
            top: cell.top,
            left: cell.left,
            bottom: cell.bottom,
            right: cell.right
           })}></div>)}
        </div>))}
      </div>
    )
  };
}

export default Maze;
