import React, { Component } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AlgorithmSelector from "./optionsComponents/algorithmSelection";
import "./options.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlgoOpen: false,
      svgElRotate: 0,
      alogName: "No algorithm selected"
    };
    this.clicked = this.clicked.bind(this);
    this.changeAlgorithm = this.changeAlgorithm.bind(this);
  }

  clicked() {
    let rotate = 0;
    if (this.state.svgElRotate === 0) rotate = 180;
    this.setState({
      isAlgoOpen: !this.state["isAlgoOpen"],
      svgElRotate: rotate
    });
  }

  changeAlgorithm(name) {
    this.setState({
      isAlgoOpen: !this.state["isAlgoOpen"],
      alogName: name,
      svgElRotate: this.state.svgElRotate === 0 ? 180 : 0
    });
  }

  render() {
    const { isAlgoOpen, svgElRotate } = this.state;
    return (
      <div className="header">
        <div className="heading">
          <div className="title">
            <p>Algorithms Visualization</p>
          </div>
          <div className="tools">
            <div className="algorithms">
              <div className="algoClickable" onClick={this.clicked}>
                <p>Algorithms</p>
                <MdKeyboardArrowDown
                  style={{ transform: `rotate(${svgElRotate}deg)` }}
                ></MdKeyboardArrowDown>
              </div>
              <AlgorithmSelector
                algoFunc={this.changeAlgorithm}
                toShow={isAlgoOpen}
              ></AlgorithmSelector>
            </div>
            <div onClick={this.props.execClearPath} className="clearPath">
              <p>Clear Path</p>
            </div>
            <div onClick={this.props.execClearBoard} className="clearBoard">
              <p>Clear Board</p>
            </div>
          </div>
          <div className="visualize">
            <p onClick={()=>{this.props.execAlgo(this.state.alogName)}}>Visualize</p>
          </div>
        </div>
        <div className="options">
          <div
            className={this.props.startBg === true ? "selectedBg" : ""}
            onClick={this.props.enableStartBool}
          >
            <p>Start Node</p>
          </div>
          <div
            className={this.props.endBg === true ? "selectedBg" : ""}
            onClick={this.props.enableEndBool}
          >
            <p>End Node</p>
          </div>
          <div
            onClick={() => {
              this.props.wallOption();
            }}
            className={this.props.wallBg === true ? "selectedBg" : ""}
          >
            <p>Add wall</p>
          </div>
          <div
            onClick={() => {
              this.props.weightOption();
            }}
            className={this.props.weightBg === true ? "selectedBg" : ""}
          >
            <p>Add weighted wall</p>
          </div>
          <div className="algoShow">
            <p>{this.state.alogName}</p>
          </div>
        </div>
      </div>
    );
  }
}
