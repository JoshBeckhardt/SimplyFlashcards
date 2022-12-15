using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.Repositories;

namespace simply_flashcards_backend.BusinessLogic
{
    public class UsersBLL : IUsersBLL
    {
        private IConfiguration configuration;
        private IUsersRepository usersRepository;
        private SymmetricSecurityKey jwtSecretKey;

        public UsersBLL(
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor,
            IUsersRepository usersRepository
        )
        {
            this.configuration = configuration;
            this.usersRepository = usersRepository;
            jwtSecretKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetValue<string>("JwtSecretKey")));
        }

        private void GenerateHashAndSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (HMACSHA512 hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private string GenerateJwt(User user)
        {
            List<Claim> claims = new List<Claim>() {
                new Claim(ClaimTypes.Name, (user.Username) ?? "")
            };
            JwtSecurityToken jwt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(jwtSecretKey, SecurityAlgorithms.HmacSha512Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        private bool IsCorrectPassword(User user, string password)
        {
            using (HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt ?? new byte[] {}))
            {
                return (hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password))).SequenceEqual(user.PasswordHash ?? new byte[] {});
            }
        }

        public async Task<JwtDTO> RegisterAsync(string? username, string? password)
        {
            if (string.IsNullOrEmpty(username))
            {
                return new JwtDTO() {
                    Username = "default",
                    Jwt = " 400"
                };
            }

            if (string.IsNullOrEmpty(password))
            {
                return new JwtDTO() {
                    Username = "default",
                    Jwt = " 400"
                };
            }

            if (((username) ?? "").Any(c => Char.IsWhiteSpace(c)))
            {
                return new JwtDTO() {
                    Username = "default",
                    Jwt = " 400"
                };
            }

            User userWithUsername = await usersRepository.GetUserByUsernameAsync(username ?? "");
            if (userWithUsername != null)
            {
                return new JwtDTO() {
                    Username = "default",
                    Jwt = " 409"
                };
            }

            GenerateHashAndSalt(password ?? "", out byte[] passwordHash, out byte[] passwordSalt);
            User newUser = new User() {
                UserId = Guid.NewGuid(),
                Username = username ?? "",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await usersRepository.RegisterAsync(newUser);

            return new JwtDTO() {
                Username = newUser.Username,
                Jwt = GenerateJwt(newUser)
            };
        }

        public async Task<string> LoginAsync(string? username, string? password)
        {
            if (string.IsNullOrEmpty(username))
            {
                return " 400";
            }

            if (string.IsNullOrEmpty(password))
            {
                return " 400";
            }

            User user = await usersRepository.GetUserByUsernameAsync(username ?? "");

            if (user == null)
            {
                return " 401";
            }

            if (!IsCorrectPassword(user, (password) ?? ""))
            {
                return " 401";
            }

            return GenerateJwt(user);
        }
    }
}
