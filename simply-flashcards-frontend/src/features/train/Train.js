import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../../css/Train.css';
import '../../css/SelectDeck.css';
import * as constants from '../../constants';
import {
  chooseDeck,
  setDeckTitle,
  selectCurrentDeckId,
  selectCurrentDeckTitle,
  selectCurrentDeckCards,
  selectLoadingCurrentDeckCards,
  selectLoadingCurrentDeckCardsRejected
} from '../cards/cardSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import SelectDeck from '../select-deck/SelectDeck';

const Train = () => {
  const currentDeckId = useSelector(selectCurrentDeckId);
  const currentDeckTitle = useSelector(selectCurrentDeckTitle);
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
                id="train"
                style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
              >
                <div className="title-content-wrapper">
                  <div className="deck-title">
                    {currentDeckTitle}
                  </div>
                  <div className="card-parent">
                    <div
                      className="arrow"
                      style={{
                        display: currentDeckCards.length ? "block" : "none",
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
                      {
                        currentDeckCards.length ? (
                          <Card
                            currentText={onAnswerSide ? currentDeckCards[currentCard].answer : currentDeckCards[currentCard].prompt}
                            deleted={false}
                            setOnAnswerSide={setOnAnswerSide}
                            editMode={false}
                          />
                        ) : (
                          <div className="no-card">
                            Deck Empty
                          </div>
                        )
                      }
                      {
                        currentDeckCards.length ? (
                          <div className="side-indicator">
                            {
                              onAnswerSide ? (
                                "Click card to view prompt"
                              ) : (
                                "Click card to view answer"
                              )
                            }
                          </div>
                        ) : (
                          null
                        )
                      }
                      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                        <input
                          type="button"
                          value="Select New Deck"
                          onClick={() => dispatch(chooseDeck(null))}
                        />
                      </div>
                    </div>
                    <div
                      className="arrow"
                      style={{
                        display: currentDeckCards.length ? "block" : "none",
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
                  <div className="flex-balancer"></div>
                </div>
              </div>
            ) : (
              <SelectDeck
                onSelect={(deck) => {
                  setOnAnswerSide(0);
                  setCurrentCard(0);
                  dispatch(setDeckTitle(deck.title));
                  dispatch(chooseDeck(deck.deckId));
                }}
              />
            )
          )
        )
      }
    </>
  );
};

export default Train;
