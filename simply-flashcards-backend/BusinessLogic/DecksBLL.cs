using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.Repositories;

namespace simply_flashcards_backend.BusinessLogic
{
    public class DecksBLL : IDecksBLL
    {
        private IDecksRepository decksRepository;

        public DecksBLL(
            IDecksRepository decksRepository
        )
        {
            this.decksRepository = decksRepository;
        }

        public async Task<IEnumerable<Deck>> GetAllDecksAsync()
        {
            return await decksRepository.GetAllDecksAsync();
        }

        public async Task<Deck?> GetDeckByDeckIdAsync(Guid deckId)
        {
            return await decksRepository.GetDeckByDeckIdAsync(deckId);
        }
    }
}
