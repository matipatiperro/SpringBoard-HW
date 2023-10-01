import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { FCPThresholds } from "web-vitals";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    initialBoard = Array.from({ length: nrows }).map((row) =>
      Array.from({
        length: ncols,
      }).map((cell) => Math.random() < chanceLightStartsOn)
    );
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    // player wins if all lights off or !cell
    // The every() method of Array instances tests whether all elements in the array pass the test implemented by the provided function.
    // It returns a Boolean value.
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      // split take the string and makes an array with the split values in it
      // map takes the array and maps values from the array according to the function specified
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      // return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win</div>;
  }
  // make table board

  let theBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    // push cells into each row space (ncols)
    for (let x = 0; x < ncols; x++) {
      // string with grid like 4-1
      let coord = `${y}-${x}`;
      // console.log("coord: ", coord);
      row.push(
        <Cell
          key={coord}
          // board is set from useState, createBoard function
          isLit={board[y][x]}
          flipCellsAroundMe={(evt) => flipCellsAround(coord)}
        />
      );
    }
    // once cells for the row are built out, add it to the board
    // theBoard.push(<tr key={y}>{row}</tr>);
    theBoard.push(<tr>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{theBoard}</tbody>
    </table>
  );
}

export default Board;
