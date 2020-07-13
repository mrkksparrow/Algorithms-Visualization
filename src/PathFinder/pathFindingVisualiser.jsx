import React, { Component } from "react";
import "./pathFindingVisualiser.css";
import Node from "./Nodes";

export default class PathFindingVisualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      start: [],
      dest: [],
      pathExists: false
    };
    this.changeStartDestPair = this.changeStartDestPair.bind(this);
    this.wall = [];
    this.start = false;
  }

  dijkstra = async () => {
    if (this.state.start.length === 0 || this.state.dest.length === 0) {
      alert("Start or Destination Node missing");
      return;
    }
    let tempNodes = [...this.state.nodes];
    this.clearPath();
    let weight = [];
    for (let i = 0; i < 15 * 30; i++) {
      weight.push(Infinity);
    }
    let curStart = [...this.state.start];
    let curNode = tempNodes[curStart["0"]][curStart["1"]];
    let d = [...this.state["dest"]];
    let start = tempNodes[curStart["0"]][curStart["1"]];
    let destination = tempNodes[d["0"]][d["1"]];
    weight[curNode.row * 30 + curNode.col] = 0;
    while (curNode != null) {
      let curRow = curNode.row;
      let curCol = curNode.col;
      curNode.visited = true;
      let adjX = [curRow - 1, curRow, curRow, curRow + 1];
      let adjY = [curCol, curCol - 1, curCol + 1, curCol];
      for (let k = 0; k < 4; k++) {
        let tempRow = adjX[k];
        let tempCol = adjY[k];
        if (
          tempRow >= 15 ||
          tempCol >= 30 ||
          tempCol < 0 ||
          tempRow < 0 ||
          tempNodes[tempRow][tempCol].isWall === true
        )
          continue;
        if (
          weight[curRow * 30 + curCol] + tempNodes[tempRow][tempCol].weight <
          weight[tempRow * 30 + tempCol]
        ) {
          weight[tempRow * 30 + tempCol] =
            weight[curRow * 30 + curCol] + tempNodes[tempRow][tempCol].weight;
          tempNodes[tempRow][tempCol].from = curNode;
        }
      }
      let nextNode = null;
      let min = Infinity;
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 30; j++) {
          if (
            tempNodes[i][j].visited === false &&
            min > weight[i * 30 + j] &&
            weight[i * 30 + j] < weight[d["0"] * 30 + d["1"]]
          ) {
            min = weight[i * 30 + j];
            nextNode = tempNodes[i][j];
          }
        }
      }
      curNode = nextNode;
      if (min === Infinity) curNode = null;
      this.setState({
        nodes: tempNodes
      });
      await this.sleep(5);
    }

    destination = destination["from"];
    if (destination == null) {
      await this.sleep(500);
      alert("No path found");
    }
    while (destination !== start && destination != null) {
      destination.isPath = true;
      destination = destination["from"];
    }
    this.setState({
      nodes: tempNodes,
      pathExists: true
    });
  };

  sleep = async ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  clearPath = () => {
    let tempNode = [...this.state["nodes"]];
    tempNode = tempNode.map(row => {
      return row.map(node => {
        node.isPath = false;
        node.visited = false;
        node.from = null;
        return node;
      });
    });
    this.setState({
      nodes: tempNode,
      pathExists: false
    });
  };

  clearBoard = () => {
    let tempNode = [...this.state["nodes"]];
    tempNode = tempNode.map(row => {
      return row.map(node => {
        node.isPath = false;
        node.visited = false;
        node.from = null;
        node.weight = 1;
        node.isWall = false;
        node.isStart = false;
        node.isEnd = false;
        return node;
      });
    });
    this.setState({
      nodes: tempNode,
      pathExists: false
    });
  };

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 30; col++) {
        const currentNode = {
          col,
          row,
          isStart: false,
          isEnd: false,
          visited: false,
          from: null,
          isPath: false,
          isWall: false,
          weight: 1
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }

    this.props.getAlgoFx([this.dijkstra,this.aStar]);
    this.props.getClearPathFx(this.clearPath);
    this.props.getClearBoardFx(this.clearBoard);

    this.setState({
      nodes
    });
  }

  getHeuristic = (dest)=>{
    let heuristics = [];
    for(let i=0;i<15;i++){
      let temp = [];
      for(let j=0;j<30;j++){
        temp.push(Math.floor(Math.sqrt(
          Math.pow(i-dest[0],2)+Math.pow(j-dest[1],2)
        )));
      }
      heuristics.push(temp);
    }
    return heuristics;
  }

  aStar = async ()=>{
    let curStart = [...this.state.start];
    let dest = [...this.state.dest];
    if(curStart.length===0 || dest.length ===0){
      alert("Start or End Node is missing");
      return;
    }
    this.clearPath();
    let heuristics = this.getHeuristic(dest);
    let distance = [];
    let visited = [];
    for(let i=0;i<15;i++){
      for(let j=0;j<30;j++){
        distance.push(Infinity);
        visited.push(false);
      }
    }

    let tempNodes = [...this.state.nodes];
    let curNode = tempNodes[curStart[0]][curStart[1]];
    distance[curNode.row*30+curNode.col] = 0;


      while(curNode!=null){
        curNode.visited = true;
        visited[curNode.row*30+curNode.col] = true;
        let x = [curNode.row-1,curNode.row,curNode.row,curNode.row+1];
        let y = [curNode.col,curNode.col-1,curNode.col+1,curNode.col];
        for(let i=0;i<4;i++){
          if(x[i]<0||x[i]>=15||y[i]<0||y[i]>=30)continue;
          let temp = distance[curNode.row*30+curNode.col];
          if(tempNodes[x[i]][y[i]]['isWall']===false && distance[x[i]*30+y[i]] > temp + curNode.weight){
            distance[x[i]*30+y[i]] = temp + curNode.weight;
            tempNodes[x[i]][y[i]].from = curNode;
          }
        }
  
        let tempNode = null;
        let minHeuristic = Infinity;
        for(let i=0;i<15;i++){
          for(let j=0;j<30;j++){
            if(distance[i*30+j] !== Infinity  && visited[i*30+j]===false && minHeuristic > distance[i*30+j] + heuristics[i][j] && distance[dest[0]*30+dest[1]] > distance[i*30+j] + heuristics[i][j]){
              minHeuristic = distance[i*30+j] + heuristics[i][j];
              tempNode = tempNodes[i][j];
            }
          }
        }
        curNode = tempNode;
        this.setState({
          nodes: tempNodes
        });
        await this.sleep(5);
      }
      let destination = tempNodes[dest[0]][dest[1]].from;
      if(destination==null){
        alert("No Path Found");
        return;
      }
      while(destination !== tempNodes[curStart[0]][curStart[1]]){
        destination.isPath = true;
        destination = destination["from"];
      }
      this.setState({
        nodes: tempNodes,
        pathExists: true
      });
  }

  changeStartDestPair(row, col) {
    if (this.props.canChangeStart === true) {
      let x = [...this.state["nodes"]];
      let start = [...this.state["start"]];
      if (start.length !== 0) {
        x[start["0"]][start["1"]].isStart = false;
      }
      x[row][col].isStart = true;
      this.setState(
        {
          nodes: x,
          start: [row, col]
        },
        () => {
          if (this.state["dest"].length > 0 && this.state.pathExists === true)
            this.dijkstra();
        }
      );
    } else if (this.props.canChangeDest === true) {
      let x = [...this.state["nodes"]];
      let dest = [...this.state["dest"]];
      if (dest.length !== 0) {
        x[dest["0"]][dest["1"]].isEnd = false;
      }
      x[row][col].isEnd = true;
      this.setState(
        {
          nodes: x,
          dest: [row, col]
        },
        () => {
          if (this.state["start"].length > 0 && this.state.pathExists === true)
            this.dijkstra();
        }
      );
    }
  }

  createWall = (row, col) => {
    if (this.start === true) {
      let tempNodes = [...this.state.nodes];
      tempNodes[`${row}`][`${col}`]["isWall"] = !tempNodes[`${row}`][`${col}`][
        "isWall"
      ];
      this.setState({
        nodes: tempNodes
      });
    }
  };

  addWeight = (row, col) => {
    if (this.start === true) {
      let tempNodes = [...this.state.nodes];
      if (tempNodes[`${row}`][`${col}`]["weight"] === 1)
        tempNodes[`${row}`][`${col}`]["weight"] = 5;
      else tempNodes[`${row}`][`${col}`]["weight"] = 1;
      this.setState({
        nodes: tempNodes
      });
    }
  };

  divHovered = (row, col) => {
    if (this.props.canChangeWeight === true) this.addWeight(row, col);
    else if (this.props.canChangeWall === true) this.createWall(row, col);
  };

  render() {
    const { nodes } = this.state;
    return (
      <div
        onMouseUp={() => {
          if (
            this.props.canChangeWall === true ||
            this.props.canChangeWeight === true
          )
            this.start = false;
        }}
        className="container"
      >
        <div className="grid-outer">
          <div className="dummy"></div>
          <div
            onMouseDown={ev => {
              if (
                this.props.canChangeWall === true ||
                this.props.canChangeWeight === true
              ) {
                this.start = true;
                this.divHovered(
                  ev.target.getAttribute("row"),
                  ev.target.getAttribute("col")
                );
              }
            }}
            className="grid"
          >
            {nodes.map((row, rowIndex) => {
              return (
                <div className="row" key={rowIndex}>
                  {row.map((node, nodeIndex) => (
                    <Node
                      weight={node.weight === 1 ? false : true}
                      divHovered={this.divHovered}
                      isWall={node.isWall}
                      isPath={node.isPath}
                      visited={node.visited}
                      changeStartDestPair={this.changeStartDestPair}
                      key={nodeIndex}
                      isStart={node["isStart"]}
                      isEnd={node["isEnd"]}
                      row={rowIndex}
                      col={nodeIndex}
                    ></Node>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
