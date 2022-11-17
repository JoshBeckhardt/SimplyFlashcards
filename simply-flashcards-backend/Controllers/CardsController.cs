using Microsoft.AspNetCore.Mvc;
using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.BusinessLogic;

namespace simply_flashcards_backend.Controllers;

[ApiController]
[Route("cards")]
public class CardsController : ControllerBase
{
    private ICardsBLL cardsBLL;

    public CardsController(
        ICardsBLL cardsBLL
    )
    {
        this.cardsBLL = cardsBLL;
    }

    [HttpGet]
    public async Task<IEnumerable<CardDTO>> GetAllCardsAsync()
    {
        return (await cardsBLL.GetAllCardsAsync()).Select(card => card.ToDTO());
    }

    [HttpGet]
    [Route("{deckId}")]
    public async Task<ActionResult<IEnumerable<CardDTO>>> GetCardsByDeckIdAsync(Guid deckId)
    {
        IEnumerable<Card> cards = await cardsBLL.GetCardsByDeckIdAsync(deckId);

        if (cards.Count() == 0)
        {
            return BadRequest();
        }

        return Ok(cards.Select(card => card.ToDTO()));
    }
}