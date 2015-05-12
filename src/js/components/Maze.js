import React from "react";
import BEM from "utils/BEM";
import Immutable from "immutable";

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
    const MAZE_WIDTH = 15;
    const MAZE_LENGTH = 15;

    let startSet = Array.apply(null, {length: MAZE_WIDTH}).map((el, i)=> ({
      top: false,
      left: false,
      bottom: false,
      right: false,
      value: i
    }));
    let result = [];

    for (let rowIndex=0; rowIndex < MAZE_LENGTH; rowIndex += 1) {
      let lengthOfSubset = 1;

      startSet
        .map((cell, cellIndex) => {
          if (startSet[cellIndex + 1] !== undefined && startSet[cellIndex + 1].value === cell.value) {
            cell.right = true;
          } else if (Math.random() < 0.5 && startSet[cellIndex + 1] !== undefined) {
            startSet[cellIndex + 1].value = cell.value;
          } else {
            cell.right = true;
          }

          cell.top = rowIndex === 0;
          cell.left = cellIndex === 0;
          cell.right = (cellIndex === (MAZE_WIDTH - 1)) || cell.right;

          return cell;
        })
        .map((el, k) => {
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
        });

      result.push(startSet);

      startSet = Immutable.fromJS(startSet).toJS()
        .map((el,index, array) => {
          if (el.bottom) {
            el.value = this.getFirstUniqueInt(array.map(el => el.value));
          }
          el.bottom = false;
          el.right = false;
          return el;
        })

    }

    result[result.length - 1]
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

    return result;
  }

  getFirstUniqueInt(arr) {
    let result = 0;

    while (arr.indexOf(result) >= 0) {
      result+=1;
    }

    return result;
  }

  newMaze() {
    this.setState({maze: this.renderMaze()})
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
           })}>{cell.value}</div>)}
        </div>))}

        <button style = {{marginTop: 50}} onClick={this.newMaze.bind(this)}>Rerender</button>
      </div>
    )
  };
}

export default Maze;