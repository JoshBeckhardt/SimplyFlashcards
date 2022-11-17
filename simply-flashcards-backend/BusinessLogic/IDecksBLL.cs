using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.BusinessLogic
{
    public interface IDecksBLL
    {
        Task<IEnumerable<Deck>> GetAllDecksAsync();
        Task<Deck?> GetDeckByDeckIdAsync(Guid deckId);
    }
}
