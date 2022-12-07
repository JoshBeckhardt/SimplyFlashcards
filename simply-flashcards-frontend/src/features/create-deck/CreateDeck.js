import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../../css/CreateDeck.css';
import * as constants from '../../constants';
import {
  submitNewDeck
} from '../cards/cardSlice';
import Card from '../../components/Card';

const EditDeck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onAnswerSide, setOnAnswerSide] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("Deck Title");

  return (
    <div
      id="create-deck"
      style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
    >
      <div className="title-content-wrapper">
        <div className="deck-title">
          <input
            style={{ width: "50%" }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="card-parent">
          <div
            className="arrow"
            style={{
              display: cards.length ? "block" : "none",
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
              cards.length ? (
                <Card
                  currentText={cards[currentCard][onAnswerSide ? "answer" : "prompt"]}
                  deleted={cards[currentCard].deleted}
                  setOnAnswerSide={setOnAnswerSide}
                  editMode={true}
                  onChangeTextArea={(e) => {
                    if (e.target.value.length > 140) {
                      return;
                    }

                    const newCards = JSON.parse(JSON.stringify(cards));
                    newCards[currentCard][onAnswerSide ? "answer" : "prompt"] = e.target.value;
                    setCards(newCards);
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
                disabled={cards.length === 0}
                onClick={() => setOnAnswerSide(previousOnAnswerSide => !previousOnAnswerSide)}
              />
              <input
                type="button"
                value={
                  cards.length === 0 ||
                  cards[currentCard].deleted ? (
                    "Keep Card"
                  ) : (
                    "Remove Card"
                  )
                }
                disabled={cards.length === 0}
                onClick={() => {
                  const newCards = JSON.parse(JSON.stringify(cards));
                  newCards[currentCard].deleted = !(newCards[currentCard].deleted);
                  setCards(newCards);
                }}
              />
              <span
                className="card-index-character-count"
                style={{ display: cards.length ? "inline" : "none" }}
              >
                {
                  cards.length === 0 ? (
                    ""
                  ) : (
                    `
                      ${currentCard + 1} (${onAnswerSide ? (
                        cards[currentCard].answer.length
                      ) : (
                        cards[currentCard].prompt.length
                      )}/140)
                    `
                  )
                }
              </span>
              <div>
                {
                  cards.length === 0 ? (
                    <input
                      className="add-card-only"
                      type="button"
                      value="Add First Card"
                      onClick={() => setCards([{ ...(constants.NEW_CARD), deckId: constants.EMPTY_GUID }])}
                    />
                  ) : (
                    <>
                      <input
                        className="add-card"
                        type="button"
                        value="Add Card Before Current Card"
                        onClick={() => {
                          const newCards = JSON.parse(JSON.stringify(cards));
                          newCards.splice(currentCard, 0, { ...(constants.NEW_CARD), deckId: constants.EMPTY_GUID });
                          setCards(newCards);
                        }}
                      />
                      <input
                        className="add-card"
                        type="button"
                        value="Add Card After Current Card"
                        onClick={() => {
                          const newCards = JSON.parse(JSON.stringify(cards));
                          newCards.splice(currentCard + 1, 0, { ...(constants.NEW_CARD), deckId: constants.EMPTY_GUID });
                          setCards(newCards);
                          setCurrentCard(previousCurrentCard => previousCurrentCard + 1);
                        }}
                      />
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div
            className="arrow"
            style={{
              display: cards.length ? "block" : "none",
              color: currentCard === cards.length - 1 ? constants.DISABLED_COLOR : "white",
              cursor: currentCard === cards.length - 1 ? "auto" : "pointer"
            }}
            onClick={() => {
              if (currentCard < cards.length - 1) {
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
          disabled={cards.length === 0}
          onClick={() => {
            dispatch(submitNewDeck({ title, cards }));
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default EditDeck;
