using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public interface IDecksRepository
    {
        Task<IEnumerable<Deck>> GetAllDecksAsync();
        Task<Deck?> GetDeckByDeckIdAsync(Guid deckId);
        Task UpdateLastModifiedDateAsync(Guid deckId);
        Task EditDeckAsync(Deck deck);
        Task DeleteDeckAsync(Guid deckId);
        Task CreateDeckAsync(string title, Guid deckId);
    }
}
