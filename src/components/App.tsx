import React, { useState, useEffect } from "react";
// Components
import QuizCard from "./QuizCard";
import QuizInfoBar from "./QuizInfoBar";

// Models
import { fetchQuizData, Category, QuizResponse } from "../models/api";

const TOTAL_QUIZZES = 10;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (index === TOTAL_QUIZZES - 1) setGameOver(true);
  }, [index]);

  const startQuiz = async () => {
    setGameOver(false);
    setScore(0);

    await fetchQuizData(TOTAL_QUIZZES, Category.SCIENCE_COMPUTERS)
      .then((res) => {
        setQuizzes(res);
        setLoading(false);
        setIndex(0);
      })
      .catch((err) => console.error(err));
  };

  const checkAnswer = (selectedOption: string) => {
    if (!gameOver) {
      const isCorrect = quizzes[index].correct_answer === selectedOption;

      if (isCorrect) setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuiz = () => {
    if (index < TOTAL_QUIZZES - 1) setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver && (
        <button className="app__start" onClick={startQuiz}>
          Start
        </button>
      )}

      <QuizInfoBar
        quizIndex={index + 1}
        totalQuizzes={TOTAL_QUIZZES}
        score={score}
      />
      {loading ? (
        <p className="app__loading">Loading Questions ...</p>
      ) : (
        <QuizCard
          question={quizzes[index].question}
          options={quizzes[index].options}
          checkAnswer={checkAnswer}
        />
      )}
      {!gameOver && (
        <button className="app__next" onClick={nextQuiz}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default App;
