import React from "react";
import { deleteDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";



function DeckCard({deck}) {
    const history = useHistory();

    // TODO Implement the window.confirm() thing
    const deleteDeckHandler = async () => {
        await deleteDeck(deck.id);
        history.go(0);
    }
    const linkToDeck = `/decks/${deck.id}`;
    const linkToDeckStudy = `/decks/${deck.id}/study`;


    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{deck.name}</h2>
                <p className="card-text">{deck.description}</p>
                <Link to={linkToDeck} className="btn btn-secondary">View</Link>
                <Link to={linkToDeckStudy} className="btn btn-primary">Study</Link>
                <button onClick={deleteDeckHandler} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default DeckCard;