import React, { useState } from "react";
// Components
import QuizCard from "./QuizCard";
import QuizInfo from "./QuizInfo";

// Models
import { fetchQuizData, Category, QuizResponse } from "../models/api";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUIZZES = 10;

type userAnswer = {
  chosen_answer?: string;
};

type Quiz = QuizResponse & userAnswer;

const isQuizAnswered = ({ chosen_answer }: Quiz) => chosen_answer !== undefined;

const isQuizCorrectAnswered = ({ correct_answer, chosen_answer }: Quiz) =>
  chosen_answer === correct_answer;

const App = () => {
  const [quizNumber, setQuizNumber] = useState(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const score = quizzes.filter(isQuizCorrectAnswered).length;
  const isOver = quizzes.every(isQuizAnswered);
  const quiz = quizzes[quizNumber];

  const answerQuiz = (chosen_answer: string) => {
    setQuizzes((quizzes) =>
      Object.assign([...quizzes], {
        [quizNumber]: { ...quiz, chosen_answer },
      })
    );
  };

  const nextQuiz = () => setQuizNumber((quizNumber) => quizNumber + 1);

  const loadQuizzes = () =>
    fetchQuizData(TOTAL_QUIZZES, Category.COMPUTERS_SCIENCE)
      .then((quizzes: Quiz[]) => {
        setQuizNumber(0);
        setQuizzes(quizzes);
      })
      .catch(console.error);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <h1 className="app__title">REACT QUIZ</h1>
          {quizzes.length === 0 ? (
            <>
              <h3>Welcome to the Computer-Science Quiz!</h3>
              <p>👇 Click to start</p>
            </>
          ) : (
            <>
              <QuizInfo
                quizIndex={quizNumber + 1}
                totalQuizzes={TOTAL_QUIZZES}
                score={score}
                difficulty={quiz.difficulty}
              />
              <QuizCard
                question={quiz.question}
                correctAnswer={quiz.correct_answer}
                incorrectAnswers={quiz.incorrect_answers}
                onAnswer={answerQuiz}
              />
            </>
          )}
          {isOver ? (
            <button className="app__start" onClick={loadQuizzes}>
              {quizNumber === 0 ? "Start" : "Restart"}
            </button>
          ) : (
            <button
              className="app__next"
              onClick={nextQuiz}
              disabled={!isQuizAnswered(quiz)}
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
