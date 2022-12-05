using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.BusinessLogic
{
    public interface ICardsBLL
    {
        Task<IEnumerable<Card>> GetAllCardsAsync();
        Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId);
        Task<IEnumerable<Card>> UpdateDeckAsync(
            Guid deckId,
            IEnumerable<Guid> cardsDeleted,
            IEnumerable<Card> cardsCreated,
            IEnumerable<Card> cardsEdited,
            List<object> order
        );
    }
}
