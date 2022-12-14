using Microsoft.AspNetCore.Mvc;
using simply_flashcards_backend.DTOs;
using simply_flashcards_backend.Entities;
using simply_flashcards_backend.BusinessLogic;
using Microsoft.AspNetCore.Authorization;

namespace simply_flashcards_backend.Controllers;

[ApiController]
[Route("cards")]
[Authorize]
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

        Card? firstCard = cards.FirstOrDefault();
        if (firstCard != null && firstCard.CardId == Guid.Empty)
        {
            return StatusCode(Int32.Parse(((firstCard.Prompt) ?? " 500").Substring(1)));
        }

        return Ok(cards.Select(card => card.ToDTO()));
    }

    [HttpPut]
    [Route("{deckId}")]
    public async Task<ActionResult<IEnumerable<CardDTO>>> UpdateDeckAsync(Guid deckId, [FromBody] List<CardDTO> cards)
    {
        List<object> order = new List<object>();

        for (int i = 0; i < cards.Count; i++)
        {
            if ((cards[i].Prompt ?? "").Length > 140 || (cards[i].Answer ?? "").Length > 140)
            {
                return BadRequest();
            }

            if (cards[i].CardId == Guid.Empty)
            {
                cards[i].CardId = Guid.NewGuid();
            }

            order.Add(new { CardId = cards[i].CardId, Position = i });
        }

        IEnumerable<Guid> cardsDeleted = cards
            .Where(c => (c.Deleted ?? false) && c.CardId != Guid.Empty)
            .Select(c => c.CardId);

        IEnumerable<Card> cardsCreated = cards
            .Where(c => !(c.Deleted ?? false) && (c.Created ?? false))
            .Select(c => new Card {
                CardId = c.CardId,
                DeckId = c.DeckId,
                Prompt = c.Prompt,
                Answer = c.Answer
            });

        IEnumerable<Card> cardsEdited = cards
            .Where(c => !(c.Deleted ?? false) && !(c.Created ?? false) && (c.Edited ?? false))
            .Select(c => new Card {
                CardId = c.CardId,
                DeckId = c.DeckId,
                Prompt = c.Prompt,
                Answer = c.Answer
            });

        List<Card> deck = (await cardsBLL.UpdateDeckAsync(deckId, cardsDeleted, cardsCreated, cardsEdited, order)).ToList();
        Card? firstCard = deck.FirstOrDefault();

        if (firstCard != null && firstCard.CardId == Guid.Empty)
        {
            return StatusCode(Int32.Parse(((firstCard.Prompt) ?? " 500").Substring(1)));
        }

        return Ok((deck).Select(card => card.ToDTO()));
    }
}
