import React from "react";
import {Link} from "react-router-dom";

function NotEnoughCards({deckId, nowCards}) {

    return (
        <>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {nowCards} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" >Add Cards</Link>
        </>
    )
}

export default NotEnoughCards;