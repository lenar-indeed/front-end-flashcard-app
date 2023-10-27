import React from "react";
import { deleteDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";



function DeckCard({deck}) {
    const history = useHistory();

    const deleteDeckHandler = async () => {
        if (window.confirm("Delete this deck? You will not be able to recover it")) {
            await deleteDeck(deck.id);
            history.go(0);
        }
    }
    const linkToDeck = `/decks/${deck.id}`;
    const linkToDeckStudy = `/decks/${deck.id}/study`;


    return (
        <div className="card">
            <div className="card-body">
                <div className="row mr-2 ml-0">
                    <h2 className="card-title">{deck.name}</h2>
                    <p className="ml-auto">{deck.cards.length} cards</p>
                </div>
                <p className="card-text">{deck.description}</p>
                <div className="row">
                    <div className="col">
                    <Link to={linkToDeck} className="btn btn-secondary mr-2">View</Link>
                    <Link to={linkToDeckStudy} className="btn btn-primary mr-2">Study</Link>
                    </div>

                    <button onClick={deleteDeckHandler} className="btn btn-danger mr-3">
                        <span className="oi oi-trash"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeckCard;