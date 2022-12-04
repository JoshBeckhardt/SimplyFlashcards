using System.Transactions;
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

        public async Task<IEnumerable<Card>> UpdateDeckAsync(Guid deckId, IEnumerable<Guid> cardsDeleted, IEnumerable<Card> cardsCreated, IEnumerable<Card> cardsEdited)
        {
            List<Card> updatedCards = new List<Card>();
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await cardsRepository.DeleteCardsAsync(cardsDeleted);
                await cardsRepository.CreateCardsAsync(cardsCreated);
                await cardsRepository.UpdateCardsAsync(cardsEdited);
                updatedCards = (await cardsRepository.GetCardsByDeckIdAsync(deckId)).ToList();
                scope.Complete();
            }
            return updatedCards;
        }
    }
}
