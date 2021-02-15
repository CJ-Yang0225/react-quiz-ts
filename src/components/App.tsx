import React, { useState, useEffect } from "react";
// Components
import QuizCard from "./QuizCard";
import QuizInfoBar from "./QuizInfoBar";

// Models
import { fetchQuizData, Category, QuizResponse } from "../models/api";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUIZZES = 10;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const startQuiz = async () => {
    await fetchQuizData(TOTAL_QUIZZES, Category.COMPUTERS_SCIENCE)
      .then((res) => {
        setQuizzes(res);
        setLoading(false);
        setIndex(0);
      })
      .catch((err) => console.error(err));
    setGameOver(false);
    setAnswered(false);
    setScore(0);
  };

  const checkAnswer = (selectedOption: string) => {
    const isCorrect = quizzes[index].correct_answer === selectedOption;
    setAnswered(true);
    if (isCorrect) setScore((prevScore) => prevScore + 1);
    if (index === TOTAL_QUIZZES - 1) setGameOver(true);
  };

  const nextQuiz = () => {
    setAnswered(false);
    if (index < TOTAL_QUIZZES - 1) setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <h1 className="app__title">REACT QUIZ</h1>
          <QuizInfoBar
            quizIndex={index + 1}
            totalQuizzes={TOTAL_QUIZZES}
            score={score}
          />
          {gameOver && index === 0 ? (
            <>
              <h3>Welcome to the Computer-Science Quiz!</h3>
              <p>👇 Click to start</p>
            </>
          ) : loading ? (
            <p className="app__loading">Loading Questions ...</p>
          ) : (
            <QuizCard
              question={quizzes[index].question}
              correctAnswer={quizzes[index].correct_answer}
              incorrectAnswers={quizzes[index].incorrect_answers}
              checkAnswer={checkAnswer}
            />
          )}
          {gameOver ? (
            <button className="app__start" onClick={startQuiz}>
              Start
            </button>
          ) : (
            <button
              className="app__next"
              onClick={nextQuiz}
              style={{ visibility: answered ? "visible" : "hidden" }}
            >
              Next Question
            </button>
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default App;
