CREATE TABLE decks (
  "DeckId" uuid PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  "Title" varchar,
  "CreatedDate" timestamp WITH TIME ZONE NOT NULL,
  "LastModifiedDate" timestamp WITH TIME ZONE NOT NULL
);

CREATE TABLE cards (
  "CardId" uuid PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  "DeckId" uuid NOT NULL,
  "Prompt" varchar,
  "Answer" varchar,
  CONSTRAINT fk_cards_decks FOREIGN KEY ("DeckId") REFERENCES Decks ("DeckId")
);
