import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../../css/SelectDeck.css';
import * as constants from  '../../constants';
import {
  getDecks,
  selectDecks,
  selectLoadingDecks,
  selectLoadingDecksRejected
} from '../deck/deckSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const SelectDeck = ({
  onSelect
}) => {
  const decks = useSelector(selectDecks);
  const loadingDecks = useSelector(selectLoadingDecks);
  const loadingDecksRejected = useSelector(selectLoadingDecksRejected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previousLoadingDecks, setPreviousLoadingDecks] = useState(null);
  const [noDecks, setNoDecks] = useState(null);

  useEffect(() => {
    dispatch(getDecks());
  }, []);

  useEffect(() => {
    if (previousLoadingDecks && !loadingDecks && !decks.length) {
      setNoDecks(true);
    } else {
      if (loadingDecks) {
        setNoDecks(null);
      }
    }
    setPreviousLoadingDecks(loadingDecks);
  }, [decks]);

  return (
    <div
      className="select-deck"
      style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
    >
      <div className="select-deck-panel">
        {
          loadingDecks ? (
            <div style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}>
              <LoadingSpinner />
            </div>
          ) : (
            loadingDecksRejected ? (
              <div style={{ width: "fit-content", position: "relative", top: "50%", transform: "translateY(-50%)", margin: "auto" }}>
                Error
              </div>
            ) : (
              <div className="select-deck-table">
                {
                  noDecks ? (
                    <div
                      className="select-deck-no-decks"
                      onClick={() => navigate(`/${constants.CREATE_DECK}`)}
                    >
                      <div>
                        You have no decks! Click here to create one.
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="select-deck-table-header-row">
                        <div className="select-deck-table-header-cell">
                          Title
                        </div>
                        <div className="select-deck-table-header-cell">
                          Owner
                        </div>
                        <div className="select-deck-table-header-cell">
                          Date Created
                        </div>
                        <div className="select-deck-table-header-cell">
                          Date Last Modified
                        </div>
                      </div>
                      {
                        decks.map((deck) => (
                          <div
                            key={deck.deckId}
                            className="select-deck-list-item"
                            onClick={() => onSelect(deck)}
                          >
                            <div className="select-deck-list-item-cell">
                              {deck.title}
                            </div>
                            <div className="select-deck-list-item-cell">
                              {deck.ownerUsername}
                            </div>
                            <div className="select-deck-list-item-cell">
                              {new Date(deck.createdDate).toLocaleDateString()}
                            </div>
                            <div className="select-deck-list-item-cell">
                              {new Date(deck.lastModifiedDate).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      }
                    </>
                  )
                }
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default SelectDeck;
