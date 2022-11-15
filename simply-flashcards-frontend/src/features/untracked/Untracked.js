import React, { useState } from 'react';

import '../../css/Untracked.css';
import * as constants from '../../constants';
import Card from '../../components/Card';
import SelectDeck from '../select-deck/SelectDeck';

const Untracked = () => {
  const [onAnswerSide, setOnAnswerSide] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const deck = [
    {
      deckId: "d61f8767-81f5-49a7-a511-221ef75e02d8",
      cardId: "921b3671-8160-44d1-afdc-ff8bf17dc6f1",
      prompt: `12 ${String.fromCharCode(215)} 7`,
      answer: "84"
    },
    {
      deckId: "d61f8767-81f5-49a7-a511-221ef75e02d8",
      cardId: "5f25386f-38e2-4c7a-998b-b389b862c5cb",
      prompt: `6 ${String.fromCharCode(215)} 8`,
      answer: "48"
    },
    {
      deckId: "d61f8767-81f5-49a7-a511-221ef75e02d8",
      cardId: "bab6b36d-0ad2-4051-9577-6fe5f368dd7c",
      prompt: `9 ${String.fromCharCode(215)} 7`,
      answer: "63"
    },
    {
      deckId: "d61f8767-81f5-49a7-a511-221ef75e02d8",
      cardId: "cd104188-f4e6-4d37-b449-cf6ea49d4d45",
      prompt: `17 ${String.fromCharCode(215)} 17`,
      answer: "289"
    }
  ];

  return (
    <>
      {
        false ? (
          <div
            id="untracked-mode"
            style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
          >
            <div className="card-parent">
              <div
                className="arrow"
                style={{
                  color: currentCard === 0 ? constants.DISABLED_COLOR : "white",
                  cursor: currentCard === 0 ? "auto" : "pointer"
                }}
                onClick={() => {
                  if (currentCard > 0) {
                    setCurrentCard(previousCurrentCard => previousCurrentCard - 1);
                    setOnAnswerSide(false);
                  }
                }}
              >
                &#8678;
              </div>
              <div>
                <Card
                  prompt={deck[currentCard].prompt}
                  answer={deck[currentCard].answer}
                  onAnswerSide={onAnswerSide}
                  setOnAnswerSide={setOnAnswerSide}
                />
                <div className="side-indicator">
                  {
                    onAnswerSide ? (
                      "Click card to view prompt"
                    ) : (
                      "Click card to view answer"
                    )
                  }
                </div>
              </div>
              <div
                className="arrow"
                style={{
                  color: currentCard === deck.length - 1 ? constants.DISABLED_COLOR : "white",
                  cursor: currentCard === deck.length - 1 ? "auto" : "pointer"
                }}
                onClick={() => {
                  if (currentCard < deck.length - 1) {
                    setCurrentCard(previousCurrentCard => previousCurrentCard + 1);
                    setOnAnswerSide(false);
                  }
                }}
              >
                &#8680;
              </div>
            </div>
          </div>
        ) : (
          <SelectDeck
            onSelect={(deckId) => {console.log(deckId)}}
          />
        )
      }
    </>
  );
};

export default Untracked;
