import React from 'react';

import '../css/Card.css';

const Card = ({
  prompt,
  answer,
  onAnswerSide,
  setOnAnswerSide
}) => {
  

  return (
    <div
      className="card"
      onClick={() => {
        setOnAnswerSide(previousAnswerSide => !previousAnswerSide);
      }}
    >
      <div
        className="inner"
      >
        {
          onAnswerSide ? (
            answer
          ) : (
            prompt
          )
        }
      </div>
    </div>
  );
};

export default Card;
