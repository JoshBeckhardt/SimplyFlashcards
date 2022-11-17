using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.BusinessLogic
{
    public interface IDecksBLL
    {
        public Task<IEnumerable<Deck>> GetAllDecksAsync();
        public Task<Deck?> GetDeckByDeckIdAsync(Guid deckId);
    }
}
