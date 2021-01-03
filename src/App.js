import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import SetTimer from "./components/SetTimer";
library.add(faMinusSquare, faPlusSquare);

class App extends Component {
  render() {
    const breakProps = {
      title: "Break Length",
      value: 5,
      handleDecrease: this.handleDecrement,
      handleIncrease: this.handleIncrement
    };

    const sessionProps = {
      title: "Session Length",
      value: 25,
      handleDecrease: this.handleDecrement,
      handleIncrease: this.handleIncrement
    };
    return (
      <div>
        <div>
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
      </div>
    );
  }
}

export default App;
