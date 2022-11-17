using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend
{
    public static class Extensions
    {
        public static DeckDTO ToDTO(this Deck deck)
        {
            return new DeckDTO {
                DeckId = deck.DeckId,
                Title = deck.Title,
                CardCount = deck.CardCount,
                CreatedDate = deck.CreatedDate,
                LastModifiedDate = deck.LastModifiedDate
            };
        }

        public static CardDTO ToDTO(this Card card)
        {
            return new CardDTO {
                CardId = card.CardId,
                DeckId = card.DeckId,
                Prompt = card.Prompt,
                Answer = card.Answer
            };
        }
    }
}
