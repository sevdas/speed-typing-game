import React, { useState, useEffect } from "react";

export default function App() {
  //Keep track of the state of the text
  //Hold current value of the count down timer and display
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  //Calculate the number of words in the textarea field
  const calculateWordCount = (countText) => {
    const countTextArr = text.trim().split(" ");
    return countTextArr.filter((word) => word !== "").length;
  };

  const handleClick = () => {
    setIsTimeRunning(true);
  };

  // Update timer every time timeRemaining value changes.
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false);
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea type="text" value={text} onChange={handleChange} />
      <h4>Remaining Time:{timeRemaining}</h4>
      <button onClick={handleClick} className="button">
        Start
      </button>
      <h1>Word Count:</h1>
    </div>
  );
}
