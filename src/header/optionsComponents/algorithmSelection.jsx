import React, { Component } from "react";
import "./algorithmSelect.css";

export default class AlgorithmSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithms: ["Dijkstra", "A-star","Bell-Ford"]
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.animateElements();
    }, 0);
  }

  animateElements() {
    let algos = document.getElementsByClassName("algorithmsHolder")[0]
      .childNodes;
    if (this.props["toShow"] === true) {
      Array.from(algos).forEach((element, index) => {
        element.style.transform = `translate(0,${index * 100}%)`;
      });
    } else {
      Array.from(algos).forEach((element, index) => {
        element.style.transform = `translate(0,0)`;
      });
    }
  }

  render() {
    const { algorithms } = this.state;
    const toShow = this.props["toShow"] === true ? "show" : "";
    return (
      <div className={`algorithmsHolder ${toShow}`}>
        {algorithms.map((item, index) => {
          return (
            <div
              onClick={() => this.props.algoFunc(algorithms[index])}
              key={index}
            >
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
