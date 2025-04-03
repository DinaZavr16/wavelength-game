import React from "react";
import "./CluesDisplay.css";

const CluesDisplay = ({ leftClue, rightClue }) => {
  return (
    <div className="clues-display">
      <div className="clue">{leftClue}</div>
      <div className="bidirectional-arrow"></div>
      <div className="clue">{rightClue}</div>
    </div>
  );
};

export default CluesDisplay;
