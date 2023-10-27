import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck, updateDeck } from "../../../utils/api";

function EditDeck() {
    const [deck, setDeck] = useState({name: "", description: ""});
    const {deckId} = useParams();
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

    const submitHandler = async (event) => {
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deckId}`);
    };

    const changeHandler = (event) => {
        setDeck({...deck, [event.target.name]: event.target.value});
    }

    if (!deck) {
        return <p>Loading</p>
    };
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`} >{deck.name}</Link></li>
                    <li className="breadcrumb-item">Edit</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" className="form-control" placeholder={deck.name} name="name" id="name" value={deck.name} onChange={changeHandler} />
                <label>Description</label>
                <textarea rows={5} className="form-control" placeholder={deck.description} name="description" id="description" value={deck.description} onChange={changeHandler} />
                <Link className="btn btn-secondary mr-2 mt-2" to={`/decks/${deckId}`}>Cancel</Link>
                <button className="btn btn-primary mt-2" type="submit">Submit</button>
            </form>
        </>
    )
}

export default EditDeck;