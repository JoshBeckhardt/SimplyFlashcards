using Microsoft.AspNetCore.Mvc;
using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.BusinessLogic;

namespace simply_flashcards_backend.Controllers;

[ApiController]
[Route("decks")]
public class DecksController : ControllerBase
{
    private IDecksBLL decksBLL;

    public DecksController(
        IDecksBLL decksBLL
    )
    {
        this.decksBLL = decksBLL;
    }

    [HttpGet]
    public async Task<IEnumerable<DeckDTO>> GetAllDecksAsync()
    {
        return (await decksBLL.GetAllDecksAsync()).Select(deck => deck.ToDTO());
    }

    [HttpGet]
    [Route("{deckId}")]
    public async Task<ActionResult<DeckDTO>> GetDeckByDeckIdAsync(Guid deckId)
    {
        Deck? deck = await decksBLL.GetDeckByDeckIdAsync(deckId);

        if (deck == null)
        {
            return NotFound();
        }

        return deck.ToDTO() ?? new DeckDTO();
    }

    [HttpPut]
    [Route("{deckId}")]
    public async Task<ActionResult<DeckDTO>> EditDeck(Guid deckId, [FromBody] DeckDTO deck)
    {
        if (deckId != deck.DeckId)
        {
            return BadRequest();
        }

        Deck? updatedDeck = await decksBLL.EditDeck(new Deck {
            DeckId = deck.DeckId,
            Title = deck.Title
        });

        if (deck == null)
        {
            return StatusCode(500);
        }

        return Ok((updatedDeck ?? new Deck()).ToDTO());
    }
}
