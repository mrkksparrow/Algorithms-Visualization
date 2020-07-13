import React, { Component } from "react";
import { FaWeightHanging } from "react-icons/fa";
import "./Nodes.css";

export default class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isStart,
      isEnd,
      isPath,
      visited,
      isWall,
      row,
      col,
      weight
    } = this.props;
    const extraClassName = isStart ? "node-start" : isEnd ? "node-end" : "";
    const pathClass = isPath ? "path" : "";
    const visitedClass =
      visited === true &&
      isStart === false &&
      isEnd === false &&
      isPath === false
        ? "visited"
        : "";
    const wallClass = isWall === true ? "wall" : "";
    return (
      <div
        row={row}
        col={col}
        onMouseOver={() => {
          this.props.divHovered(row, col);
        }}
        onClick={() =>
          this.props.changeStartDestPair(this.props.row, this.props.col)
        }
        className={`node ${extraClassName} ${pathClass} ${visitedClass} ${wallClass}`}
      >
        {weight >= 1 && <FaWeightHanging></FaWeightHanging>}
      </div>
    );
  }
}
