using Dapper;
using Newtonsoft.Json;
using Npgsql;
using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public class CardsRepository : ICardsRepository
    {
        private IConfiguration configuration;
        private string? _connectionString;

        public CardsRepository(
            IConfiguration configuration
        )
        {
            this.configuration = configuration;
            _connectionString = configuration.GetConnectionString("sfcdatabase");
        }

        public async Task<IEnumerable<Card>> GetAllCardsAsync()
        {
            string sql = "SELECT * FROM cards";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Card>(sql);
            }
        }

        public async Task<IEnumerable<Card>> GetCardsByDeckIdAsync(Guid deckId)
        {
            string sql = "SELECT * FROM cards WHERE \"DeckId\" = @DeckId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Card>(sql, new { DeckId = deckId });
            }
        }

        public async Task UpdateCardsAsync(IEnumerable<Card> cardsEdited)
        {
            string cardsEditedSerialized = JsonConvert.SerializeObject(cardsEdited);

            string sql = (
                @"
                    WITH
                        ""UnnestedCardsEdited""
                        AS
                        (
                            SELECT JSONB_ARRAY_ELEMENTS(@CardsEdited::JSONB) AS ""SerializedCard""
                        ),
                        ""DeserializedCardsEdited""
                        AS
                        (
                            SELECT
                                (""SerializedCard""->>'CardId')::UUID AS ""CardId"",
                                (""SerializedCard""->>'DeckId')::UUID AS ""DeckId"",
                                (""SerializedCard""->>'Prompt') AS ""Prompt"",
                                (""SerializedCard""->>'Answer') AS ""Answer""
                            FROM
                                ""UnnestedCardsEdited""
                        )
                    UPDATE
                        cards
                    SET
                        ""Prompt"" = ""DeserializedCardsEdited"".""Prompt"", ""Answer"" = ""DeserializedCardsEdited"".""Answer""
                    FROM
                        ""DeserializedCardsEdited""
                    WHERE
                        cards.""CardId"" = ""DeserializedCardsEdited"".""CardId"";
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { CardsEdited = cardsEditedSerialized });
            }
        }
    }
}