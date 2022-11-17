namespace simply_flashcards_backend.DTOs
{
    public class DeckDTO
    {
        public Guid DeckId { get; set; }
        public string? Title { get; set; }
        public int? CardCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
