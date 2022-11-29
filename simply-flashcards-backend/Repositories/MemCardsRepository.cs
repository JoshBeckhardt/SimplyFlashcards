using simply_flashcards_backend.BusinessLogic;
using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public class MemCardsRepository : ICardsRepository
    {
        private List<Card> cards = new() {
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("9497abcd-d5f2-4e6c-b569-360e8bc495ea"),
                Prompt = "12 \u00D7 7",
                Answer = "84"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("9497abcd-d5f2-4e6c-b569-360e8bc495ea"),
                Prompt = "6 \u00D7 8",
                Answer = "48"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("9497abcd-d5f2-4e6c-b569-360e8bc495ea"),
                Prompt = "9 \u00D7 7",
                Answer = "63"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("9497abcd-d5f2-4e6c-b569-360e8bc495ea"),
                Prompt = "17 \u00D7 17",
                Answer = "289"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("4f5e7699-3c52-4064-b528-8521965f11d5"),
                Prompt = "H",
                Answer = "1"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("4f5e7699-3c52-4064-b528-8521965f11d5"),
                Prompt = "He",
                Answer = "2"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("4f5e7699-3c52-4064-b528-8521965f11d5"),
                Prompt = "Li",
                Answer = "3"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("4f5e7699-3c52-4064-b528-8521965f11d5"),
                Prompt = "Be",
                Answer = "4"
            },
            new Card {
                CardId = Guid.NewGuid(),
                DeckId = new Guid("4f5e7699-3c52-4064-b528-8521965f11d5"),
                Prompt = "B",
                Answer = "5"
            },
        };

        public async Task<IEnumerable<Card>> GetAllCardsAsync()
        {
            return await Task.FromResult(cards);
        }

        public async Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId)
        {
            return await Task.FromResult(cards.Where(card => card.DeckId == deckId));
        }

        public async Task UpdateCardsAsync(IEnumerable<Card> cardsEdited)
        {
            cards = cards.Select(c => {
                Card? newCard = cardsEdited.Where(ce => ce.CardId == c.CardId).FirstOrDefault();
                if (newCard == null)
                {
                    return c;
                }
                return newCard;
            }).ToList();
            await Task.CompletedTask;
        }
    }
}
