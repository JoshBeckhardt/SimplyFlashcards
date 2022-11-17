using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.BusinessLogic
{
    public interface ICardsBLL
    {
        Task<IEnumerable<Card>> GetAllCardsAsync();
        Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId);
    }
}