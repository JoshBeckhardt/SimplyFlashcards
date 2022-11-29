import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../../css/EditDeck.css';
import '../../css/SelectDeck.css';
import * as constants from '../../constants';
import {
  chooseDeck,
  setDeckTitle,
  submitEditedDeck,
  selectCurrentDeckId,
  selectCurrentDeckTitle,
  selectCurrentDeckCards,
  selectLoadingCurrentDeckCards,
  selectLoadingCurrentDeckCardsRejected
} from '../cards/cardSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import SelectDeck from '../select-deck/SelectDeck';

const EditDeck = () => {
  const currentDeckId = useSelector(selectCurrentDeckId);
  const currentDeckTitle = useSelector(selectCurrentDeckTitle);
  const currentDeckCards = useSelector(selectCurrentDeckCards);
  const loadingCurrentDeckCards = useSelector(selectLoadingCurrentDeckCards);
  const loadingCurrentDeckCardsRejected = useSelector(selectLoadingCurrentDeckCardsRejected);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onAnswerSide, setOnAnswerSide] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [editedCards, setEditedCards] = useState(null);

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
                id="edit-deck"
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
                        currentText={(editedCards || currentDeckCards)[currentCard][onAnswerSide ? "answer" : "prompt"]}
                        setOnAnswerSide={setOnAnswerSide}
                        editMode={true}
                        onChangeTextArea={(e) => {
                          const newEditedCards = JSON.parse(JSON.stringify(editedCards || currentDeckCards));
                          newEditedCards[currentCard][onAnswerSide ? "answer" : "prompt"] = e.target.value;
                          newEditedCards[currentCard].edited = true;
                          setEditedCards(newEditedCards);
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <input
                          type="button"
                          value={`Flip to ${onAnswerSide ? "Prompt" : "Answer"}`}
                          onClick={() => setOnAnswerSide(previousOnAnswerSide => !previousOnAnswerSide)}
                        />
                        <span>
                          {
                            `
                              ${currentCard + 1} (${onAnswerSide ? (
                                (editedCards || currentDeckCards)[currentCard].answer.length
                              ) : (
                                (editedCards || currentDeckCards)[currentCard].prompt.length
                              )}/140)
                            `
                          }
                        </span>
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
                        color: currentCard === (editedCards || currentDeckCards).length - 1 ? constants.DISABLED_COLOR : "white",
                        cursor: currentCard === (editedCards || currentDeckCards).length - 1 ? "auto" : "pointer"
                      }}
                      onClick={() => {
                        if (currentCard < (editedCards || currentDeckCards).length - 1) {
                          setCurrentCard(previousCurrentCard => previousCurrentCard + 1);
                          setOnAnswerSide(false);
                        }
                      }}
                    >
                      &#8680;
                    </div>
                  </div>
                  <input
                    className="submit-button"
                    type="button"
                    value="Submit Deck"
                    onClick={() => {
                      if (Array.isArray(editedCards)) {
                        dispatch(submitEditedDeck({ deckId: currentDeckId, cards: editedCards }))
                      }
                      navigate("/");
                    }}
                  />
                </div>
              </div>
            ) : (
              <SelectDeck
                onSelect={(deck) => {
                  setOnAnswerSide(0);
                  setCurrentCard(0);
                  dispatch(setDeckTitle(deck.title));
                  setEditedCards(null);
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

export default EditDeck;
