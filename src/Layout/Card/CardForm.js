import React from "react";
import { Link } from "react-router-dom";

function CardForm({deckId, card, formSubmit, formChange}) {
    return (
        <form onSubmit={formSubmit}>
            <label>Front</label>
            <textarea className="form-control mb-3" placeholder="Front side of card" name="front" onChange={formChange} id="front" value={card.front} />
            <label>Back</label>
            <textarea className="form-control" placeholder="Back side of card" name="back" onChange={formChange} id="back" value={card.back} />
            <Link className="btn btn-secondary mr-2 mt-3" to={`/decks/${deckId}`}>Done</Link>
            <button className="btn btn-primary mt-3">Save</button>
        </form>
    )
}

export default CardForm;