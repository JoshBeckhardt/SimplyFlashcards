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
            string sql = "SELECT * FROM cards WHERE \"DeckId\" = @DeckId ORDER BY \"Position\" ASC";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Card>(sql, new { DeckId = deckId });
            }
        }

        public async Task DeleteCardsAsync(IEnumerable<Guid> cardsDeleted)
        {
            string sql = "DELETE FROM cards WHERE \"CardId\" = ANY(@CardsDeleted)";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { CardsDeleted = cardsDeleted.ToList() });
            }
        }

        public async Task CreateCardsAsync(IEnumerable<Card> cardsCreated)
        {
            string cardsCreatedSerialized = JsonConvert.SerializeObject(cardsCreated);
            string sql = (
                @"
                    WITH
                        ""UnnestedCardsCreated""
                        AS
                        (
                            SELECT JSONB_ARRAY_ELEMENTS(@CardsCreated::JSONB) AS ""SerializedCard""
                        ),
                        ""DeserializedCardsCreated""
                        AS
                        (
                            SELECT
                                (""SerializedCard""->>'CardId')::UUID AS ""CardId"",
                                (""SerializedCard""->>'DeckId')::UUID AS ""DeckId"",
                                (""SerializedCard""->>'Prompt') AS ""Prompt"",
                                (""SerializedCard""->>'Answer') AS ""Answer""
                            FROM
                                ""UnnestedCardsCreated""
                        )
                    INSERT INTO
                        cards
                        (""CardId"", ""DeckId"", ""Prompt"", ""Answer"")
                        SELECT
                            *
                        FROM
                            ""DeserializedCardsCreated""
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { CardsCreated = cardsCreatedSerialized });
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

        public async Task UpdateCardOrder(List<object> order)
        {
            string orderSerialized = JsonConvert.SerializeObject(order);

            string sql = (
                @"
                    WITH
                        ""UnnestedOrder""
                        AS
                        (
                            SELECT JSONB_ARRAY_ELEMENTS(@Order::JSONB) AS ""SerializedOrder""
                        ),
                        ""DeserializedOrder""
                        AS
                        (
                            SELECT
                                (""SerializedOrder""->>'CardId')::UUID AS ""CardId"",
                                (""SerializedOrder""->>'Position')::INTEGER AS ""Position""
                            FROM
                                ""UnnestedOrder""
                        )
                    UPDATE
                        cards
                    SET
                        ""Position"" = ""DeserializedOrder"".""Position""
                    FROM
                        ""DeserializedOrder""
                    WHERE
                        cards.""CardId"" = ""DeserializedOrder"".""CardId"";
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, new { Order = orderSerialized });
            }
        }
    }
}
