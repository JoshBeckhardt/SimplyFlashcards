using Dapper;
using Npgsql;
using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public class DecksRepository : IDecksRepository
    {
        private IConfiguration configuration;
        private string? _connectionString;

        public DecksRepository(
            IConfiguration configuration
        )
        {
            this.configuration = configuration;
            _connectionString = configuration.GetConnectionString("sfcdatabase");
        }

        public async Task<IEnumerable<Deck>> GetAllVisibleDecksAsync(string? ownerUsername)
        {
            string sql = (
                @"
                    SELECT
                        *,
                        (
                            SELECT
                                COUNT(*)
                            FROM
                                cards
                            WHERE
                                decks.""DeckId"" = cards.""DeckId""
                        ) AS ""CardCount""
                    FROM
                        decks
                    WHERE
                        decks.""OwnerUsername"" = @OwnerUsername OR
                        decks.""OwnerUsername"" = 'default'
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Deck>(sql, new { OwnerUsername = ownerUsername });
            }
        }

        public async Task<Deck?> GetDeckByDeckIdAsync(Guid deckId)
        {
            string sql = (
                @"
                    SELECT
                        *,
                        (
                            SELECT
                                COUNT(*)
                            FROM
                                cards
                            WHERE
                                decks.""DeckId"" = cards.""DeckId""
                        ) AS ""CardCount""
                    FROM
                        decks
                    WHERE
                        ""DeckId"" = @DeckId
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QuerySingleAsync<Deck>(sql, new { DeckId = deckId });
            }
        }

        public async Task UpdateLastModifiedDateAsync(Guid deckId)
        {
            string sql = "UPDATE decks SET \"LastModifiedDate\" = now() WHERE \"DeckId\" = @DeckId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { DeckId = deckId });
            }
        }

        public async Task EditDeckAsync(Deck deck)
        {
            string sql = (
                @"
                    UPDATE
                        decks
                    SET
                        ""Title"" = @Title,
                        ""LastModifiedDate"" = now()
                    WHERE
                        ""DeckId"" = @DeckId
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { DeckId = deck.DeckId, Title = deck.Title });
            }
        }

        public async Task DeleteDeckAsync(Guid deckId)
        {
            string sql = "DELETE FROM decks WHERE \"DeckId\" = @DeckId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { DeckId = deckId });
            }
        }

        public async Task CreateDeckAsync(string? ownerUsername, string title, Guid deckId)
        {
            string sql = (
                @"
                    INSERT INTO
                        decks
                        (
                            ""DeckId"",
                            ""Title"",
                            ""CreatedDate"",
                            ""LastModifiedDate"",
                            ""OwnerUsername""
                        )
                    VALUES
                        (
                            @DeckId,
                            @Title,
                            now(),
                            now(),
                            @OwnerUsername
                        )
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { OwnerUsername = ownerUsername, Title = title, DeckId = deckId });
            }
        }
    }
}
