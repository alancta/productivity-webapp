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
    breakMinCount: 5,
    sessionMinCount: 25,
    totalSecs: 25 * 60, //default timer set at 25 mins (*60 seconds)
    isInSession: false,
    currentMode: "Session",
    coinCount: 0
  };

  //reset timer to default values
  handleReset = () => {
    this.setState({
      breakMinCount: 5,
      sessionMinCount: 25,
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
        const {
          totalSecs,
          currentMode,
          breakMinCount,
          sessionMinCount,
          coinCount
        } = this.state;
        //set interval between every second to check totalSec value
        if (totalSecs !== 0) {
          this.setState({ totalSecs: totalSecs - 1 });
          //current timer reaches 0
        } else {
          this.setState(
            {
              currentMode: currentMode === "Session" ? "Break" : "Session",
              coinCount: currentMode === "Session" ? coinCount + 1 : coinCount,
              totalSecs:
                currentMode === "Session"
                  ? breakMinCount * 60
                  : sessionMinCount * 60
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
  handleTimeDecrement(type) {
    if (type === "session") {
      const { sessionMinCount } = this.state;
      this.setState({ sessionMinCount: sessionMinCount - 1 });
    } else {
      const { breakMinCount } = this.state;
      this.setState({ breakMinCount: breakMinCount - 1 });
    }
  }

  handleTimeIncrement(type) {
    if (type === "session") {
      const { sessionMinCount } = this.state;
      this.setState({ sessionMinCount: sessionMinCount - 1 });
    } else {
      const { breakMinCount } = this.state;
      this.setState({ breakMinCount: breakMinCount - 1 });
    }
  }

  convertToMinAndSecs = totalSecs => {
    const mins = Math.floor(totalSecs / 60);
    let secs = totalSecs % 60;
    secs = secs < 10 ? "0" + secs : secs;
    return `${mins}:${secs}`;
  };
  render() {
    const {
      breakMinCount,
      sessionMinCount,
      totalSecs,
      currentMode,
      isInSession
    } = this.state;
    const breakProps = {
      title: "Break Length",
      value: breakMinCount,
      handleDecrement: this.handleTimeDecrement("break"),
      handleIncrement: this.handleTimeIncrement("break")
    };

    const sessionProps = {
      title: "Session Length",
      value: sessionMinCount,
      handleDecrement: this.handleTimeDecrement("session"),
      handleIncrement: this.handleTimeIncrement("session")
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
