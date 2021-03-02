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
  onAnswer: emitAnswer,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState("");

  useEffect(() => {
    setOptions(() => shuffleOptions([...incorrectAnswers, correctAnswer]));
    setClicked(false);
  }, [incorrectAnswers, correctAnswer]);

  const handleClick = ({
    currentTarget: { value: answer },
  }: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    setChosenAnswer(answer);
    emitAnswer(answer);
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
            <button value={option} disabled={clicked} onClick={handleClick}>
              <span dangerouslySetInnerHTML={{ __html: option }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
export default QuizCard;
