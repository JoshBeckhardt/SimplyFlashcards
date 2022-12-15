using Microsoft.AspNetCore.Mvc;
using simply_flashcards_backend.BusinessLogic;
using simply_flashcards_backend.DTOs;

namespace simply_flashcards_backend.Controllers;

[ApiController]
[Route("users")]
public class UsersController : ControllerBase
{
    private IUsersBLL usersBLL;

    public UsersController(
        IUsersBLL usersBLL
    )
    {
        this.usersBLL = usersBLL;
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> RegisterAsync([FromBody] UserDTO user)
    {
        if (user.Username?.ToLowerInvariant() == "default")
        {
            return Conflict();
        }

        JwtDTO newUser = await usersBLL.RegisterAsync(user.Username, user.Password);

        if (newUser.Username == "default")
        {
            return StatusCode(Int32.Parse(((newUser.Jwt) ?? " 400").Substring(1)));
        }

        return Ok(newUser);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<JwtDTO>> LoginAsync([FromBody] UserDTO user)
    {
        if (user.Username?.ToLowerInvariant() == "default")
        {
            return Conflict();
        }

        string jwt = await usersBLL.LoginAsync(user.Username, user.Password);

        if (jwt[0] == ' ')
        {
            return StatusCode(Int32.Parse(jwt.Substring(1)));
        }

        return Ok(new JwtDTO() {
            Username = user.Username,
            Jwt = jwt
        });
    }
}
