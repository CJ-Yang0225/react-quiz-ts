import React from "react";

type QuizInfoProps = {
  quizIndex: number;
  totalQuizzes: number;
  score: number;
  difficulty: string;
};

const starsOfDifficulty: Record<string, string> = {
  easy: "★☆☆",
  medium: "★★☆",
  hard: "★★★",
};

const QuizInfo: React.FC<QuizInfoProps> = ({
  quizIndex,
  totalQuizzes,
  score,
  difficulty,
}) => {
  return (
    <div className="infoBar">
      <h3 className="quiz__number">
        {quizIndex} / {totalQuizzes}
      </h3>
      <h3 className="quiz__difficulty">{starsOfDifficulty[difficulty]}</h3>
      <h3 className="infoBar__score">Score: {score}</h3>
    </div>
  );
};

export default QuizInfo;
