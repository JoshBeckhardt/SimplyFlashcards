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

        public async Task<IEnumerable<Deck>> GetAllDecksAsync()
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
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Deck>(sql);
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
    }
}
