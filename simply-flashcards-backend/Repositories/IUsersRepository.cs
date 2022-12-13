using simply_flashcards_backend.Entities;

namespace simply_flashcards_backend.Repositories
{
    public interface IUsersRepository
    {
        Task RegisterAsync(User newUser);
        Task<User> GetUserByUsernameAsync(string username);
    }
}
