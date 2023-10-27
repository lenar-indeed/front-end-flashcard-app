import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck, readCard, updateCard} from "../../../utils/api"
import CardForm from "../CardForm";

function EditCard() {
    const {deckId, cardId} = useParams();
    const [deck, setDeck] = useState({name: "", description: ""});
    const [card, setCard] = useState({front: "", back: "", deckId: ""});
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

    useEffect(() => {
        const abortController = new AbortController();
        const loadCard = async () => {
            const data = await readCard(cardId, abortController.signal);
            setCard(data);
        }
        loadCard();
        return () => abortController.abort();
    }, [cardId]);

    const changeHandler = (event) => {
        setCard({...card, [event.target.name]: event.target.value});
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`} >{deck.name}</Link></li>
                    <li className="breadcrumb-item">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <CardForm deckId={deck.id} card={card} formChange={changeHandler} formSubmit={submitHandler} />
        </>
    )
}

export default EditCard;