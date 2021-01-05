import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function SetTimer(props) {
  return (
    <div className="timer-container">
      <h1>{props.title}</h1>
      <div>
        <button onClick={props.handleDecrement}>
          {" "}
          <FontAwesomeIcon icon="minus-square" />
        </button>
        <span>{props.value}</span>
        <button>
          <FontAwesomeIcon icon="plus-square" />
        </button>
      </div>
    </div>
  );
}
