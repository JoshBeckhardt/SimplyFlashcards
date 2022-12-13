using System.Transactions;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.Repositories;

namespace simply_flashcards_backend.BusinessLogic
{
    public class CardsBLL : ICardsBLL
    {
        private HttpContextAccessor? httpContextAccessor;
        private ICardsRepository cardsRepository;
        private IDecksRepository decksRepository;

        public CardsBLL(
            IHttpContextAccessor httpContextAccessor,
            ICardsRepository cardsRepository,
            IDecksRepository decksRepository
        )
        {
            this.httpContextAccessor = (HttpContextAccessor?) httpContextAccessor;
            this.cardsRepository = cardsRepository;
            this.decksRepository = decksRepository;
        }

        public async Task<IEnumerable<Card>> GetAllCardsAsync()
        {
            return await cardsRepository.GetAllCardsAsync();
        }

        public async Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId)
        {
            string? ownerUsername = httpContextAccessor?.HttpContext?.User?.Identity?.Name;
            Deck? deck = await decksRepository.GetDeckByDeckIdAsync(deckId);
            if (string.IsNullOrEmpty(ownerUsername))
            {
                throw new Microsoft.AspNetCore.Http.BadHttpRequestException("Internal Server Error", 500);
            }
            if (deck == null || deck?.OwnerUsername != ownerUsername)
            {
                throw new Microsoft.AspNetCore.Http.BadHttpRequestException("Unauthorized", 401);
            }
            return await cardsRepository.GetCardsByDeckIdAsync(deckId);
        }

        public async Task<IEnumerable<Card>> UpdateDeckAsync(
            Guid deckId,
            IEnumerable<Guid> cardsDeleted,
            IEnumerable<Card> cardsCreated,
            IEnumerable<Card> cardsEdited,
            List<object> order
        )
        {
            string? ownerUsername = httpContextAccessor?.HttpContext?.User?.Identity?.Name;
            List<Card> updatedCards = new List<Card>();
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                Deck? deck = await decksRepository.GetDeckByDeckIdAsync(deckId);
                if (string.IsNullOrEmpty(ownerUsername))
                {
                    throw new Microsoft.AspNetCore.Http.BadHttpRequestException("Internal Server Error", 500);
                }
                if (deck == null || deck?.OwnerUsername != ownerUsername)
                {
                    throw new Microsoft.AspNetCore.Http.BadHttpRequestException("Unauthorized", 401);
                }
                await cardsRepository.DeleteCardsAsync(cardsDeleted);
                await cardsRepository.CreateCardsAsync(cardsCreated);
                await cardsRepository.UpdateCardsAsync(cardsEdited);
                await cardsRepository.UpdateCardOrderAsync(order);
                await decksRepository.UpdateLastModifiedDateAsync(deckId);
                updatedCards = (await cardsRepository.GetCardsByDeckIdAsync(deckId)).ToList();
                scope.Complete();
            }
            return updatedCards;
        }
    }
}
