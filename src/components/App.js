import React, { useState, useEffect } from "react";

export default function App() {
  const STARTING_TIME = 2;
  //Keep track of the state of the text
  //Hold current value of the count down timer and display
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  //Calculate the number of words in the textarea field
  const calculateWordCount = (countText) => {
    const countTextArr = text.trim().split(" ");
    return countTextArr.filter((word) => word !== "").length;
  };

  //After the game ends, make it so the user can click the start button again to display a second time.
  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
  };

  const endGame = () => {
    setIsTimeRunning(false);
    setWordCount(calculateWordCount(text));
  };

  //Update timer every time timeRemaining value changes.
  //Display number of the words the user typed in once timer reaches 0.
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  //Disable the button when time is running
  //Disable the text area when time is not running
  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
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

// User has to click the start button and then to click up into the input box to start typing.
// Clicking start button clears the box which could be better.
// Clicking button more then once freaks out the numbers. Every time we click game start, it creates many versions of our useEffect and setTimeout. Setting out state bunch of times which causes bugs. To fix it disable the button when time is running.
//Focus on text area automatically when user clicks on the start button without them needing to click text area manually so they can start typing immediately.
