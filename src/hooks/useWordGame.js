import { useState, useRef, useEffect } from "react";

export default function useWordGame(startingTime = 10) {
  //Keep track of the state of the text
  //Hold current value of the count down timer and display
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);

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
  //Make the input box focus immediately when the game starts
  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(startingTime);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
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

  return {
    textBoxRef,
    text,
    handleChange,
    isTimeRunning,
    timeRemaining,
    startGame,
    wordCount,
  };
}
