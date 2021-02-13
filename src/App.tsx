import React, { useState, useEffect } from "react";
import { callbackify } from "util";
// Components
import QuestionCard from "./components/QuestionCard";
import QuizInfoBar from "./components/QuizInfoBar";
import { fetchQuizData, Category, QuizResponse } from "./models/api";

const TOTAL_QUIZZES = 10;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startTrivia = async () => {
    setGameOver(false);

    await fetchQuizData(TOTAL_QUIZZES, Category.SCIENCE_COMPUTERS)
      .then((res) => {
        setQuizzes(res);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  // const { question, options } = quizzes[index];

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {(gameOver || index === TOTAL_QUIZZES) && (
        <button className="app__start" onClick={startTrivia}>
          Start
        </button>
      )}

      <QuizInfoBar
        quizIndex={index}
        totalQuizzes={TOTAL_QUIZZES}
        score={score}
      />
      {loading ? (
        <p className="app__loading">Loading Questions ...</p>
      ) : (
        <QuestionCard
          hasAnswered={false}
          question={quizzes[index].question}
          options={quizzes[index].options}
          callback={checkAnswer}
        />
      )}
      <button className="app__next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default App;
