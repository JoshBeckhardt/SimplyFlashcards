using simply_flashcards_backend.Entities;
using simply_flashcards_backend.Repositories;

namespace simply_flashcards_backend.BusinessLogic
{
    public class CardsBLL : ICardsBLL
    {
        private ICardsRepository cardsRepository;

        public CardsBLL(
            ICardsRepository cardsRepository
        )
        {
            this.cardsRepository = cardsRepository;
        }

        public async Task<IEnumerable<Card>> GetAllCardsAsync()
        {
            return await cardsRepository.GetAllCardsAsync();
        }

        public async Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId)
        {
            return await cardsRepository.GetCardsByDeckIdAsync(deckId);
        }

        public async Task<IEnumerable<Card>> UpdateDeckAsync(Guid deckId, IEnumerable<Card> cardsEdited)
        {
            await cardsRepository.UpdateCardsAsync(cardsEdited);
            return await cardsRepository.GetCardsByDeckIdAsync(deckId);
        }
    }
}
