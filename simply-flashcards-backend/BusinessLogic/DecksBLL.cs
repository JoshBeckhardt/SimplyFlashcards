using System.Transactions;
using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.Repositories;

namespace simply_flashcards_backend.BusinessLogic
{
    public class DecksBLL : IDecksBLL
    {
        private IDecksRepository decksRepository;
        private ICardsRepository cardsRepository;

        public DecksBLL(
            IDecksRepository decksRepository,
            ICardsRepository cardsRepository
        )
        {
            this.decksRepository = decksRepository;
            this.cardsRepository = cardsRepository;
        }

        public async Task<IEnumerable<Deck>> GetAllDecksAsync()
        {
            return await decksRepository.GetAllDecksAsync();
        }

        public async Task<Deck?> GetDeckByDeckIdAsync(Guid deckId)
        {
            return await decksRepository.GetDeckByDeckIdAsync(deckId);
        }

        public async Task<Deck?> EditDeckAsync(Deck deck)
        {
            await decksRepository.EditDeckAsync(deck);
            return await decksRepository.GetDeckByDeckIdAsync(deck.DeckId);
        }

        public async Task DeleteDeckAsync(Guid deckId)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await cardsRepository.DeleteCardsByDeckIdAsync(deckId);
                await decksRepository.DeleteDeckAsync(deckId);
                scope.Complete();
            }
        }

        public async Task<object> CreateDeckAsync(string title, List<Card> cards)
        {
            Guid deckId = Guid.NewGuid();

            List<object> order = new List<object>();

            for (int i = 0; i < cards.Count; i++)
            {
                cards[i].DeckId = deckId;
                cards[i].CardId = Guid.NewGuid();

                order.Add(new { CardId = cards[i].CardId, Position = i });
            }

            List<Card> responseCards = new List<Card>();

            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await decksRepository.CreateDeckAsync(title, deckId);
                await cardsRepository.CreateCardsAsync(cards);
                await cardsRepository.UpdateCardOrderAsync(order);
                responseCards = (await cardsRepository.GetCardsByDeckIdAsync(deckId)).ToList();
                scope.Complete();
            }

            return new { DeckId = deckId, Cards = responseCards };
        }
    }
}
