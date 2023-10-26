import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "../../../utils/api";

function DeckView() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    const deleteDeckHandler = async (event) => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            await deleteDeck(event.target.value);
            history.push("/");
        };
    };

    const deleteCardHandler = async (event) => {
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            await deleteCard(event.target.value);
            history.go("0");
        };
    }
    
    if (!deck) {
        return (<p>Loading</p>);
    } else {
        const linkToDeckEdit = `/decks/${deck.id}/edit`;
        const linkToDeckStudy = `/decks/${deck.id}/study`;
        const linkToAddCard = `/decks/${deck.id}/cards/new`;
        const cards = deck.cards.map((card) => (
            <div className="card">
                <div className="card-body">
                    <div className="card-text">{card.front}</div>
                    <div className="card-text">{card.back}</div>
                    <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                    <button className="btn btn-danger" name="deleteCard" onClick={deleteCardHandler} value={card.id}>Delete</button>
                </div>
    
            </div>
        ));
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">{deck.name}</li>
                    </ol>
                </nav>
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{deck.name}</h3>
                        <p className="card-text">{deck.description}</p>
                        <Link to={linkToDeckEdit} className="btn btn-secondary">Edit</Link>
                        <Link to={linkToDeckStudy} className="btn btn-primary">Study</Link>
                        <Link to={linkToAddCard} className="btn btn-primary">Add Cards</Link>
                        <button className="btn btn-danger" name="deleteDeck" onClick={deleteDeckHandler} value={deck.id}>Delete</button>
                    </div>
                </div>
                <div>
                    <h1>Cards</h1>
                    {cards}
                </div>
            </>
        )
    }


}

export default DeckView;