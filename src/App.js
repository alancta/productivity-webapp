import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinusSquare,
  faPlusSquare,
  faPlay,
  faPause,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";
import SetTimer from "./components/SetTimer";
library.add(faMinusSquare, faPlusSquare, faPlay, faPause, faSync);

class App extends Component {
  constructor(props) {
    super(props);
    this.subtract1SecLoop = undefined;
  }
  state = {
    breakCounter: 5,
    sessionCounter: 25,
    totalSecs: 25 * 60, //default timer set at 25 mins (*60 seconds)
    isInSession: false,
    currentMode: "Session",
    coinCount: 0
  };

  //reset timer to default values
  handleReset = () => {
    this.setState({
      breakCounter: 5,
      sessionCounter: 25,
      totalSecs: 25 * 60, //default timer set at 25 mins (*60 seconds)
      isInSession: false,
      currentMode: "Session"
    });
    clearInterval(this.subtract1SecLoop);
  };

  handlePlayPause = () => {
    const { isInSession } = this.state;

    if (isInSession) {
      //begin session and clear the "subtract 1" loop to stop the timer
      clearInterval(this.subtract1SecLoop);
      this.setState({ isInSession: false }, () =>
        console.log(this.state.isInSession)
      );
    } else {
      //if not in session, resume session
      this.setState({ isInSession: true }, () =>
        console.log(this.state.isInSession)
      );
      //and start subtracting 1 from the current timer
      this.subtract1SecLoop = setInterval(() => {
        // set 1 second interval to subtract 1 every second
        const {
          totalSecs,
          currentMode,
          breakCounter,
          sessionCounter,
          coinCount
        } = this.state;
        //set interval between every second to check totalSec value
        if (totalSecs !== 0) {
          this.setState({ totalSecs: totalSecs - 1 });
          //if current (either break or session) timer reaches 0
        } else {
          this.setState(
            {
              currentMode: currentMode === "Session" ? "Break" : "Session",
              coinCount: currentMode === "Session" ? coinCount + 1 : coinCount,
              totalSecs:
                currentMode === "Session"
                  ? breakCounter * 60
                  : sessionCounter * 60
            },
            () => {
              console.log("cc: " + this.state.coinCount);
            }
          );
        }
      }, 1000); //take existing value and apply loop to subtract 1
    }
  };
  componentWillUnmount() {
    clearInterval(this.subtract1SecLoop);
  }
  handleTimeDecrement = type => {
    const { sessionCounter } = this.state;
    const { breakCounter } = this.state;

    if (type === "session" && sessionCounter > 0) {
      this.setState({ sessionCounter: sessionCounter - 1 });
    } else {
      if (breakCounter > 0) {
        this.setState({ breakCounter: breakCounter - 1 });
      }
    }
  };

  handleTimeIncrement = type => {
    const { sessionCounter } = this.state;

    if (type === "session") {
      this.setState({ sessionCounter: sessionCounter + 1 });
    } else {
      const { breakCounter } = this.state;
      this.setState({ breakCounter: breakCounter + 1 });
    }
  };

  convertToMinAndSecs = totalSecs => {
    const mins = Math.floor(totalSecs / 60);
    let secs = totalSecs % 60;
    secs = secs < 10 ? "0" + secs : secs;
    return `${mins}:${secs}`;
  };
  render() {
    const {
      breakCounter,
      sessionCounter,
      totalSecs,
      currentMode,
      isInSession
    } = this.state;

    const breakProps = {
      title: "Break Length",
      type: "break",
      value: breakCounter,
      handleDecrement: this.handleTimeDecrement,
      handleIncrement: this.handleTimeIncrement
    };

    const sessionProps = {
      title: "Session Length",
      type: "session",
      value: sessionCounter,
      handleDecrement: this.handleTimeDecrement,
      handleIncrement: this.handleTimeIncrement
    };
    return (
      <div>
        <div>
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
          <div className="clock-container">
            <h1>{currentMode}</h1>
            <span>
              <h2>{this.convertToMinAndSecs(totalSecs)}</h2>
            </span>
            <button>
              <FontAwesomeIcon
                icon={isInSession ? "pause" : "play"}
                onClick={this.handlePlayPause}
              />
            </button>
            <button>
              <FontAwesomeIcon icon="sync" onClick={this.handleReset} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
