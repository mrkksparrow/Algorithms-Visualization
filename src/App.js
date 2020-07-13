import React from "react";
import PathFindingVisualiser from "./PathFinder/pathFindingVisualiser";
import "./App.css";
import Navbar from "./header/options";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canChangeStartNode: false,
      canChangeEndNode: false,
      execDijkstra: null,
      execAStar: null,
      clearPathFx: null,
      canChangeWall: false,
      canChangeWeight: false,
      clearBoardFx: null
    };
  }

  changeStartNodeBool = () => {
    this.setState({
      canChangeStartNode: !this.state.canChangeStartNode,
      canChangeEndNode: false,
      canChangeWall: false,
      canChangeWeight: false
    });
  };

  changeEndNodeBool = () => {
    this.setState({
      canChangeWall: false,
      canChangeStartNode: false,
      canChangeEndNode: !this.state.canChangeEndNode,
      canChangeWeight: false
    });
  };

  changeWallBool = () => {
    this.setState({
      canChangeWall: !this.state.canChangeWall,
      canChangeStartNode: false,
      canChangeEndNode: false,
      canChangeWeight: false
    });
  };

  execAlgoClicked = (name) => {
    let fx = null;
    if(name === "Dijkstra")fx = this.state.execDijkstra;
    else fx = this.state.execAStar;
    fx();
    this.setState({
      canChangeWall: false,
      canChangeStartNode: false,
      canChangeEndNode: false,
      canChangeWeight: false
    });
  };
  getAlgoFx = fx => {
    this.setState({
      execDijkstra: fx[0],
      execAStar: fx[1]
    });
  };

  execClearPath = () => {
    this.state.clearPathFx();
  };

  getClearPathFx = fx => {
    this.setState({
      clearPathFx: fx
    });
  };

  getClearBoardFx = fx => {
    this.setState({
      clearBoardFx: fx
    });
  };
  execClearBoard = () => {
    this.state.clearBoardFx();
  };

  changeWeightBool = op => {
    this.setState({
      canChangeWeight: !this.state.canChangeWeight,
      canChangeWall: false,
      canChangeStartNode: false,
      canChangeEndNode: false
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          weightOption={this.changeWeightBool}
          weightBg={this.state.canChangeWeight}
          wallBg={this.state.canChangeWall}
          wallOption={this.changeWallBool}
          execAlgo={this.execAlgoClicked}
          execClearPath={this.execClearPath}
          execClearBoard={this.execClearBoard}
          startBg={this.state.canChangeStartNode}
          endBg={this.state.canChangeEndNode}
          enableStartBool={this.changeStartNodeBool}
          enableEndBool={this.changeEndNodeBool}
        ></Navbar>
        <PathFindingVisualiser
          getClearBoardFx={this.getClearBoardFx}
          canChangeWeight={this.state.canChangeWeight}
          canChangeWall={this.state.canChangeWall}
          getClearPathFx={this.getClearPathFx}
          getAlgoFx={this.getAlgoFx}
          canChangeDest={this.state.canChangeEndNode}
          canChangeStart={this.state.canChangeStartNode}
        />
      </div>
    );
  }
}

export default App;
