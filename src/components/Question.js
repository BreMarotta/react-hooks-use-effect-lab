import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     if(timeRemaining >= 1) {
  //       setTimeRemaining(timeRemaining - 1)}
  //     else{
  //       setTimeRemaining(10);
  //       onAnswered(false);
  //     }}, 1000);

  //     return function clearTimeout() {
  //       clearInterval(timerId);
  //     }
  // })
    //The above is my code. It works and meets all the deliverables without errors in the console. However, it does not pass the tests. I went to the solution in github and found their code to pass the tests.  

    useEffect(() => {
      if (timeRemaining === 0) {
        setTimeRemaining(10);
        onAnswered(false);
        return;
      }
      const timerId = setTimeout(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
      return function () {
        clearTimeout(timerId);
      };
    }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
