import React, { useState } from "react";
// Components
import QuizCard from "./QuizCard";
import QuizInfoBar from "./QuizInfo";

// Types
import { fetchQuizData, Category, QuizResponse } from "../models/api";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUIZZES = 10;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [quizNo, setQuizNo] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const quiz = quizzes[quizNo];

  console.log("App render");

  const startQuiz = async () => {
    await fetchQuizData(TOTAL_QUIZZES, Category.COMPUTERS_SCIENCE).then(
      (quizzes) => {
        setQuizzes(quizzes);
        setLoading(false);
        setGameOver(false);
        setAnswered(false);
        setQuizNo(0);
        setScore(0);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const checkAnswer = (selectedOption: string) => {
    const isCorrect = quiz.correct_answer === selectedOption;
    setAnswered(true);
    if (isCorrect) setScore((prevScore) => prevScore + 1);
    if (quizNo === TOTAL_QUIZZES - 1) setGameOver(true);
  };

  const nextQuiz = () => {
    setAnswered(false);
    if (quizNo < TOTAL_QUIZZES - 1) setQuizNo((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <h1 className="app__title">REACT QUIZ</h1>
          <QuizInfoBar
            quizIndex={quizNo + 1}
            totalQuizzes={TOTAL_QUIZZES}
            score={score}
          />
          {quizzes.length === 0 ? (
            <>
              <h3>Welcome to the Computer-Science Quiz!</h3>
              <p>👇 Click to start</p>
            </>
          ) : loading ? (
            <p className="app__loading">Loading Questions ...</p>
          ) : (
            <QuizCard
              question={quiz.question}
              correctAnswer={quiz.correct_answer}
              incorrectAnswers={quiz.incorrect_answers}
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
