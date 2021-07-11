import React, { useState, useEffect, useRef } from "react";
import useWordGame from "../hooks/useWordGame";

export default function App() {
  const {
    textBoxRef,
    text,
    handleChange,
    isTimeRunning,
    timeRemaining,
    startGame,
    wordCount,
  } = useWordGame();
  //Disable the button when time is running
  //Disable the text area when time is not running
  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={textBoxRef}
        type="text"
        value={text}
        onChange={handleChange}
        disabled={!isTimeRunning}
      />
      <h4>Remaining Time:{timeRemaining}</h4>
      <button onClick={startGame} className="button" disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word Count:{wordCount}</h1>
    </div>
  );
}
