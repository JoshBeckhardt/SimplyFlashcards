using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public interface ICardsRepository
    {
        Task<IEnumerable<Card>> GetAllCardsAsync();
        Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId);
        Task DeleteCardsAsync(IEnumerable<Guid> cardsDeleted);
        Task UpdateCardsAsync(IEnumerable<Card> cardsEdited);
    }
}
