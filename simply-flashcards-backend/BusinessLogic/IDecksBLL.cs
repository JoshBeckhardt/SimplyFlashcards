using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.BusinessLogic
{
    public interface IDecksBLL
    {
        Task<IEnumerable<Deck>> GetAllVisibleDecksAsync();
        Task<Deck?> GetDeckByDeckIdAsync(Guid deckId);
        Task<Deck?> EditDeckAsync(Deck deck);
        Task DeleteDeckAsync(Guid deckId);
        Task<object> CreateDeckAsync(string title, List<Card> cards);
    }
}
