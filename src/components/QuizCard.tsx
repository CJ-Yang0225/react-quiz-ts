import React, { useState } from "react";

type Props = {
  hasAnswered: boolean;
  question: string;
  options: string[];
  callback: any;
};

const QuestionCard: React.FC<Props> = ({
  hasAnswered,
  question,
  options,
  callback,
  ...props
}) => {
  return (
    <div className="card">
      <p dangerouslySetInnerHTML={{ __html: question + props.children }} />
      <div className="card__options">
        {options.map((option, index) => (
          <div key={index}>
            <button disabled={hasAnswered} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: option }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
