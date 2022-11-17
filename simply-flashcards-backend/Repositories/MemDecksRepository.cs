using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public class MemDecksRepository : IDecksRepository
    {
        private List<Deck> decks = new() {
            new Deck {
                DeckId = new Guid("9497abcd-d5f2-4e6c-b569-360e8bc495ea"),
                Title = "Basic Multiplication",
                CardCount = 4,
                CreatedDate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                LastModifiedDate = new DateTime(1990, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Deck {
                DeckId = new Guid("4f5e7699-3c52-4064-b528-8521965f11d5"),
                Title = "Atomic Numbers of Chemical Symbols",
                CardCount = 5,
                CreatedDate = new DateTime(1990, 1, 2, 0, 0, 0, DateTimeKind.Utc),
                LastModifiedDate = new DateTime(1990, 1, 2, 0, 0, 0, DateTimeKind.Utc)
            }
        };

        public async Task<IEnumerable<Deck>> GetAllDecksAsync()
        {
            return await Task.FromResult(decks);
        }

        public async Task<Deck?> GetDeckByDeckIdAsync(Guid deckId)
        {
            Deck? deck = decks.Where(d => d.DeckId == deckId).SingleOrDefault();

            return await Task.FromResult(deck);
        }
    }
}
