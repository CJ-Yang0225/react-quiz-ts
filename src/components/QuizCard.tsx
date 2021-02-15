import React, { useState, useLayoutEffect, useEffect } from "react";
import { Wrapper, ButtonWrapper } from "./QuizCard.styles";

type QuizCardProps = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  checkAnswer: (option: string) => void;
};

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  correctAnswer,
  incorrectAnswers,
  checkAnswer,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState("");

  const shuffleOptions = (array: string[]) =>
    array.sort(() => Math.random() - 0.5);

  useLayoutEffect(() => {
    setOptions(() => shuffleOptions([...incorrectAnswers, correctAnswer]));
    setClicked(false);
  }, [incorrectAnswers, correctAnswer]);

  // Currying
  const handleClick = (callback: any) => (answer: string) => {
    setClicked(true);
    setChosenAnswer(answer);
    // .textContent 或 .innerText 會將 HTML 特殊字元轉為一般文字 (&lt; 轉為 <)，造成比對錯誤
    callback(answer);
  };

  return (
    <Wrapper className="card">
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="card__options">
        {options.map((option) => (
          <ButtonWrapper
            key={option}
            correctOption={option === correctAnswer && clicked}
            isClicked={chosenAnswer === option}
          >
            <button
              value={option}
              disabled={clicked}
              onClick={({ currentTarget: { value } }) =>
                handleClick(checkAnswer)(value)
              }
            >
              <span dangerouslySetInnerHTML={{ __html: option }}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
export default QuizCard;
