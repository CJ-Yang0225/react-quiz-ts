import React from "react";

type QuizInfoProps = {
  quizIndex: number;
  totalQuizzes: number;
  score: number;
};

const QuizInfoBar: React.FC<QuizInfoProps> = ({ quizIndex, totalQuizzes, score }) => {
  return (
    <div className="infoBar">
      <h3>
        {quizIndex} / {totalQuizzes}
      </h3>
      <h3 className="infoBar__score">Score: {score}</h3>
    </div>
  );
};

export default QuizInfoBar;
