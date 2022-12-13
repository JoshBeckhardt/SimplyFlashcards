using Microsoft.AspNetCore.Mvc;
using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.BusinessLogic;
using Microsoft.AspNetCore.Authorization;

namespace simply_flashcards_backend.Controllers;

[ApiController]
[Route("decks")]
[Authorize]
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
    public async Task<IEnumerable<DeckDTO>> GetAllVisibleDecksAsync()
    {
        return (await decksBLL.GetAllVisibleDecksAsync()).Select(deck => deck.ToDTO());
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
    public async Task<ActionResult<DeckDTO>> EditDeckAsync(Guid deckId, [FromBody] DeckDTO deck)
    {
        if (deckId != deck.DeckId)
        {
            return BadRequest();
        }

        Deck? updatedDeck = await decksBLL.EditDeckAsync(new Deck {
            DeckId = deck.DeckId,
            Title = deck.Title
        });

        if (deck == null)
        {
            return StatusCode(500);
        }

        return Ok((updatedDeck ?? new Deck()).ToDTO());
    }

    [HttpDelete]
    [Route("{deckId}")]
    public async Task<ActionResult> DeleteDeckAsync(Guid deckId)
    {
        await decksBLL.DeleteDeckAsync(deckId);
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> CreateDeckAsync([FromBody] IEnumerable<CardDTO> requestCards)
    {
        string? title = HttpContext.Request.Query.ContainsKey("title") ? (
                HttpContext.Request.Query["title"]
            ) : (
                ""
            );

        if (string.IsNullOrWhiteSpace(title))
        {
            return BadRequest();
        }

        return Created("", await decksBLL.CreateDeckAsync(title, requestCards.Where(c => !(c.Deleted ?? false)).Select(c => new Card {
            DeckId = Guid.Empty,
            CardId = Guid.Empty,
            Prompt = c.Prompt,
            Answer = c.Answer
        }).ToList()));
    }
}
