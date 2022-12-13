using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.BusinessLogic
{
    public interface IUsersBLL
    {
        Task<JwtDTO> RegisterAsync(string? username, string? password);
        Task<string> LoginAsync(string? username, string? password);
    }
}
