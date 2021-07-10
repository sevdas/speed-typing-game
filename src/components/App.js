import React, { useState, useEffect } from "react";

export default function App() {
  //Keep track of the state of the text
  //Hold current value of the count down timer and display
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(15);

  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
    console.log(value);
  };

  //Calculate the number of words in the textarea field
  const calculateWords = (countText) => {
    const countTextArr = text.trim().split(" ");
    return countTextArr.filter((word) => word !== "").length;
  };

  // Update timer every time timeRemaining changes.
  useEffect(() => {
    timeRemaining > 0 &&
      setTimeout(() => setTimeRemaining((prevTime) => prevTime - 1), 1000);
  }, [timeRemaining])

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea type="text" value={text} onChange={handleChange} />
      <h4>Remaining Time:{timeRemaining}</h4>
      <button
        onClick={() => console.log(calculateWords(text))}
        className="button"
      >
        Start
      </button>
      <h1>Word Count:</h1>
    </div>
  );
}
