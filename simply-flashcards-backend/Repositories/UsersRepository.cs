using Dapper;
using Npgsql;
using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private IConfiguration configuration;
        private string? _connectionString;

        public UsersRepository(
            IConfiguration configuration
        )
        {
            this.configuration = configuration;
            _connectionString = configuration.GetConnectionString("sfcdatabase");
        }

        public async Task RegisterAsync(User newUser)
        {
            string sql = (
                @"
                    INSERT INTO
                        users
                        (
                            ""UserId"",
                            ""Username"",
                            ""PasswordHash"",
                            ""PasswordSalt""
                        )
                    VALUES
                        (
                            @UserId,
                            @Username,
                            @PasswordHash,
                            @PasswordSalt
                        )
                "
            );

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteScalarAsync<User>(sql, new {
                    UserId = newUser.UserId,
                    Username = newUser.Username,
                    PasswordHash = newUser.PasswordHash,
                    PasswordSalt = newUser.PasswordSalt
                });
            }
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            string sql = "SELECT * FROM users WHERE LOWER(\"Username\") = LOWER(@Username)";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QuerySingleOrDefaultAsync<User>(sql, new { Username = username });
            }
        }
    }
}
