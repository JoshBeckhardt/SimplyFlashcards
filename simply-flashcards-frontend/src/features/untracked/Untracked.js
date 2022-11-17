import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../../css/Untracked.css';
import '../../css/SelectDeck.css';
import * as constants from '../../constants';
import {
  chooseDeck,
  selectCurrentDeckId,
  selectCurrentDeckCards,
  selectLoadingCurrentDeckCards,
  selectLoadingCurrentDeckCardsRejected
} from '../cards/cardSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import SelectDeck from '../select-deck/SelectDeck';

const Untracked = () => {
  const currentDeckId = useSelector(selectCurrentDeckId);
  const currentDeckCards = useSelector(selectCurrentDeckCards);
  const loadingCurrentDeckCards = useSelector(selectLoadingCurrentDeckCards);
  const loadingCurrentDeckCardsRejected = useSelector(selectLoadingCurrentDeckCardsRejected);

  const dispatch = useDispatch();

  const [onAnswerSide, setOnAnswerSide] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <>
      {
        loadingCurrentDeckCards ? (
          <div
            className="select-deck"
            style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
          >
            <div className="select-deck-panel">
              <div style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                <LoadingSpinner />
              </div>
            </div>
          </div>
        ) : (
          loadingCurrentDeckCardsRejected ? (
            <div
              className="select-deck"
              style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
            >
              <div className="select-deck-panel">
                <div style={{ width: "fit-content", position: "relative", top: "50%", transform: "translateY(-50%)", margin: "auto" }}>
                  Error
                </div>
              </div>
            </div>
          ) : (
            currentDeckId !== null ? (
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
                      prompt={currentDeckCards[currentCard].prompt}
                      answer={currentDeckCards[currentCard].answer}
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
                      color: currentCard === currentDeckCards.length - 1 ? constants.DISABLED_COLOR : "white",
                      cursor: currentCard === currentDeckCards.length - 1 ? "auto" : "pointer"
                    }}
                    onClick={() => {
                      if (currentCard < currentDeckCards.length - 1) {
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
                onSelect={(deckId) => dispatch(chooseDeck(deckId))}
              />
            )
          )
        )
      }
    </>
  );
};

export default Untracked;
