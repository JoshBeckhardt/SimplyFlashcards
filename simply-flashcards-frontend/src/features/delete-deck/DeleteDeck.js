import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  chooseDeck,
  deleteDeck,
  setDeckTitle,
  selectCurrentDeckId,
  selectCurrentDeckTitle
} from '../cards/cardSlice';
import '../../css/DeleteDeck.css';
import * as constants from  '../../constants';
import SelectDeck from '../select-deck/SelectDeck';
import { useNavigate } from 'react-router-dom';

const DeleteDeck = () => {
  const currentDeckId = useSelector(selectCurrentDeckId);
  const currentDeckTitle = useSelector(selectCurrentDeckTitle);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return currentDeckId === null ? (
    <SelectDeck
      onSelect={(deck) => {
        dispatch(setDeckTitle(deck.title));
        dispatch(chooseDeck(deck.deckId));
      }}
    />
  ) : (
    <div
      className="delete-deck"
      style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
    >
      <div className="delete-deck-prompt-outer">
        <div className="delete-deck-prompt-inner">
          <div className="prompt-wrapper">
            <span>
              Are you sure you want to delete <span className="deck-title-span">{currentDeckTitle}</span> and all of its cards? Deleted decks cannot be restored.
            </span>
          </div>
          <div className="delete-deck-buttons-outer">
            <input
              className="delete-deck-buttons"
              type="button"
              value="No, don't delete anything."
              onClick={() => {
                navigate("/");
              }}
            />
            <input
              className="delete-deck-buttons"
              type="button"
              value="No, delete a different deck."
              onClick={() => {
                dispatch(setDeckTitle(null));
                dispatch(chooseDeck(null));
              }}
            />
            <input
              id="delete-deck-confirm-button"
              className="delete-deck-buttons"
              type="button"
              value="Yes, delete it."
              onClick={() => dispatch(deleteDeck(currentDeckId))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDeck;
