namespace simply_flashcards_backend.Entities
{
    public class Card
    {
        public Guid CardId { get; set; }
        public Guid DeckId { get; set; }
        public string? Prompt { get; set; }
        public string? Answer { get; set; }
    }
}
