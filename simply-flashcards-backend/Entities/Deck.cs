namespace simply_flashcards_backend.Entities
{
    public class Deck
    {
        public Guid DeckId { get; set; }
        public string? Title { get; set; }
        public int? CardCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
