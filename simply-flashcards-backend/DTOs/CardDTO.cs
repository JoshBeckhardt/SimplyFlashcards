namespace simply_flashcards_backend.DTOs
{
    public class CardDTO
    {
        // Remember to update NEW_CARD in constants.js when changing this class.
        public Guid CardId { get; set; }
        public Guid DeckId { get; set; }
        public string? Prompt { get; set; }
        public string? Answer { get; set; }
        public bool? Edited { get; set; }
        public bool? Created { get; set; }
        public bool? Deleted { get; set; }
    }
}
