import React, { useState } from "react";

type Props = {
  quizIndex: number;
  totalQuizzes: number;
  score: number;
};

const QuizInfoBar: React.FC<Props> = ({ quizIndex, totalQuizzes, score }) => {
  return (
    <div className="quiz__infoBar">
      <h3>Score: {score}</h3>
      <p>
        {quizIndex} / {totalQuizzes}
      </p>
    </div>
  );
};

export default QuizInfoBar;
