import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {createCard, readDeck} from "../../../utils/api";
import CardForm from "../CardForm";

function AddCard() {
    const [deck, setDeck] = useState({name: "", description: ""});
    const [card, setCard] = useState({front: "", back: "", deckId: ""});
    const {deckId} = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    const changeHandler = (event) => {
        setCard({...card, [event.target.name]: event.target.value, deckId: deckId});
    }
    const submitHandler = (event) => {
        event.preventDefault();
        createCard(deckId, card);
        setCard({front: "", back: "", deckId: ""});
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`} >{deck.name}</Link></li>
                    <li className="breadcrumb-item">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Add Card</h1>
            <CardForm deckId={deck.id} card={card} formChange={changeHandler} formSubmit={submitHandler} />
        </>
    )
}

export default AddCard;