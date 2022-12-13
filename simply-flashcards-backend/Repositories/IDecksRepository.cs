using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public interface IDecksRepository
    {
        Task<IEnumerable<Deck>> GetAllVisibleDecksAsync(string? ownerUsername);
        Task<Deck?> GetDeckByDeckIdAsync(Guid deckId);
        Task UpdateLastModifiedDateAsync(Guid deckId);
        Task EditDeckAsync(Deck deck);
        Task DeleteDeckAsync(Guid deckId);
        Task CreateDeckAsync(string? ownerUsername, string title, Guid deckId);
    }
}
