// Pathnames:
export const ROOT = "";
export const LOGIN = "login";
export const SIGNUP = "signup";
export const ABOUT = "about";
export const TRAIN = "train";
export const CREATE_DECK = "createdeck";
export const EDIT_DECK = "editdeck";
export const SETTINGS = "settings";

export const NAV_MENU_OPTIONS = [
  {
    PATHNAME: TRAIN,
    LABEL: "Train"
  },
  {
    PATHNAME: CREATE_DECK,
    LABEL: "Create Deck"
  },
  {
    PATHNAME: EDIT_DECK,
    LABEL: "Edit Deck"
  },
  {
    PATHNAME: ABOUT,
    LABEL: "About"
  },
  {
    PATHNAME: SETTINGS,
    LABEL: "Settings"
  }
];

export const CONTENT_WIDTH_PERCENT = 75;

export const MAX_CARD_CHARS = 255;

export const DISABLED_COLOR = "#AAAFB4";

export const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

export const NEW_CARD = {
  deckId: null, // This is null instead of the empty GUID so that it fails fast if not set.
  cardId: EMPTY_GUID,
  prompt: "Prompt",
  answer: "Answer",
  edited: false,
  created: true,
  deleted: false
};
