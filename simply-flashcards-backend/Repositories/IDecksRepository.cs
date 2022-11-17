using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public interface IDecksRepository
    {
        public Task<IEnumerable<Deck>> GetAllDecksAsync();
        public Task<Deck?> GetDeckByDeckIdAsync(Guid deckId);
    }
}
