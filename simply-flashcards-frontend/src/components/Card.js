import React from 'react';

import '../css/Card.css';

const Card = ({
  currentText,
  deleted,
  setOnAnswerSide,
  editMode,
  onChangeTextArea
}) => {
  return (
    <div
      className="card"
      style={{ backgroundColor: deleted ? "pink" : "white" }}
      onClick={(e) => {
        if (!editMode || e.target.tagName.toLowerCase() !== "textarea") {
          setOnAnswerSide(previousAnswerSide => !previousAnswerSide);
        }
      }}
    >
      <div
        className={editMode ? "inner-edit-mode" : "inner"}
      >
        {
          editMode ? (
            <textarea
              value={currentText}
              onChange={onChangeTextArea}
            />
          ) : (
            currentText
          )
        }
      </div>
    </div>
  );
};

export default Card;
