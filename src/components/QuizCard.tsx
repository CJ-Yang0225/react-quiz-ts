import React, { useState, useEffect } from "react";

type Props = {
  question: string;
  options: string[];
  checkAnswer: any;
};

const QuizCard: React.FC<Props> = ({
  question,
  options,
  checkAnswer,
  ...props
}) => {
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
  }, [question]);

  // Curring
  const handleClick = (checkAnswer: any) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnswered(true);
    // .textContent 或 .innerText 會將 HTML 特殊字元轉為一般文字 (&lt; 轉為 <)，造成比對錯誤
    checkAnswer(e.currentTarget.value);
  };

  console.log("re-render");

  return (
    <div className="card">
      <h4 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="card__options">
        {options.map((option, index) => (
          <div key={index}>
            <button
              value={option}
              disabled={answered}
              onClick={(e) => handleClick(checkAnswer)(e)}
            >
              <span dangerouslySetInnerHTML={{ __html: option }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuizCard;
