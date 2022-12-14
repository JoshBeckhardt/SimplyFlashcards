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
  submitEditedDeckTitle,
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
  const [editedTitle, setEditedTitle] = useState(null);

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
                    <input
                      style={{ width: "50%" }}
                      type="text"
                      value={(editedTitle === null ? currentDeckTitle : editedTitle)}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </div>
                  <div className="card-parent">
                    <div
                      className="arrow"
                      style={{
                        display: (editedCards || currentDeckCards).length ? "block" : "none",
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
                        (editedCards || currentDeckCards).length ? (
                          <Card
                            currentText={(editedCards || currentDeckCards)[currentCard][onAnswerSide ? "answer" : "prompt"]}
                            deleted={(editedCards || currentDeckCards)[currentCard].deleted}
                            setOnAnswerSide={setOnAnswerSide}
                            editMode={true}
                            onChangeTextArea={(e) => {
                              if (e.target.value.length > 140) {
                                return;
                              }

                              const newEditedCards = JSON.parse(JSON.stringify(editedCards || currentDeckCards));
                              newEditedCards[currentCard][onAnswerSide ? "answer" : "prompt"] = e.target.value;
                              newEditedCards[currentCard].edited = true;
                              setEditedCards(newEditedCards);
                            }}
                          />
                        ) : (
                          <div className="no-card">
                            Deck Empty
                          </div>
                        )
                      }
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <input
                          type="button"
                          value={`Flip to ${onAnswerSide ? "Prompt" : "Answer"}`}
                          disabled={(editedCards || currentDeckCards).length === 0}
                          onClick={() => setOnAnswerSide(previousOnAnswerSide => !previousOnAnswerSide)}
                        />
                        <input
                          type="button"
                          value={
                            (editedCards || currentDeckCards).length === 0 ||
                            (editedCards || currentDeckCards)[currentCard].deleted ? (
                              "Keep Card"
                            ) : (
                              "Remove Card"
                            )
                          }
                          disabled={(editedCards || currentDeckCards).length === 0}
                          onClick={() => {
                            const newEditedCards = JSON.parse(JSON.stringify(editedCards || currentDeckCards));
                            newEditedCards[currentCard].deleted = !(newEditedCards[currentCard].deleted);
                            setEditedCards(newEditedCards);
                          }}
                        />
                        <span className="card-index-character-count">
                          {
                            (editedCards || currentDeckCards).length === 0 ? (
                              ""
                            ) : (
                              `
                                ${currentCard + 1} (${onAnswerSide ? (
                                  (editedCards || currentDeckCards)[currentCard].answer.length
                                ) : (
                                  (editedCards || currentDeckCards)[currentCard].prompt.length
                                )}/140)
                              `
                            )
                          }
                        </span>
                        <div>
                          {
                            (editedCards || currentDeckCards).length === 0 ? (
                              <input
                                className="add-card-only"
                                type="button"
                                value="Add First Card"
                                onClick={() => setEditedCards([{ ...(constants.NEW_CARD), deckId: currentDeckId }])}
                              />
                            ) : (
                              <>
                                <input
                                  className="add-card"
                                  type="button"
                                  value="Add Card Before Current Card"
                                  onClick={() => {
                                    const newEditedCards = JSON.parse(JSON.stringify(editedCards || currentDeckCards));
                                    newEditedCards.splice(currentCard, 0, { ...(constants.NEW_CARD), deckId: currentDeckId });
                                    setEditedCards(newEditedCards);
                                  }}
                                />
                                <input
                                  className="add-card"
                                  type="button"
                                  value="Add Card After Current Card"
                                  onClick={() => {
                                    const newEditedCards = JSON.parse(JSON.stringify(editedCards || currentDeckCards));
                                    newEditedCards.splice(currentCard + 1, 0, { ...(constants.NEW_CARD), deckId: currentDeckId });
                                    setEditedCards(newEditedCards);
                                    setCurrentCard(previousCurrentCard => previousCurrentCard + 1);
                                  }}
                                />
                              </>
                            )
                          }
                        </div>
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
                        display: (editedCards || currentDeckCards).length ? "block" : "none",
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
                    disabled={(editedCards || currentDeckCards).length === 0}
                    onClick={() => {
                      if (Array.isArray(editedCards)) {
                        dispatch(submitEditedDeck({ deckId: currentDeckId, cards: editedCards }));
                      }
                      if (editedTitle) {
                        dispatch(submitEditedDeckTitle({ deckId: currentDeckId, deckTitle: editedTitle }));
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
