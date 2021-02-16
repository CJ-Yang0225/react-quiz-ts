import React, { useState, useEffect } from "react";
import { Wrapper, ButtonWrapper } from "./QuizCard.styles";

type QuizCardProps = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  onAnswer: (option: string) => void;
};

const shuffleOptions = (array: string[]) =>
  array.sort(() => Math.random() - 0.5);

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  correctAnswer,
  incorrectAnswers,
  onAnswer,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState("");

  useEffect(() => {
    setOptions(() => shuffleOptions([...incorrectAnswers, correctAnswer]));
    setClicked(false);
  }, [incorrectAnswers, correctAnswer]);

  // Currying
  const handleClick = (onAnswer: any) => (answer: string) => {
    setClicked(true);
    setChosenAnswer(answer);
    onAnswer(answer);
  };

  return (
    <Wrapper className="card">
      <h3
        className="card__question"
        dangerouslySetInnerHTML={{ __html: question }}
      />
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
                handleClick(onAnswer)(value)
              }
            >
              <span dangerouslySetInnerHTML={{ __html: option }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
export default QuizCard;
