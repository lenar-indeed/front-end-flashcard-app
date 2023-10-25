import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {createDeck} from "../../../utils/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function CreateDeck() {

    const [deck, setDeck] = useState({name: "", description: ""});
    const history = useHistory();

    const changeHandle = ({target}) => {
        setDeck({...deck, [target.name]: target.value})
    }

    const submitFormHandle = async (event) => {
        event.preventDefault();
        const data = await createDeck(deck);
        const id = data.id;
        history.push(`/decks/${id}`);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item">Create Deck</li>
            </nav>
            <form onSubmit={submitFormHandle}>
                <input type="text" name="name" onChange={changeHandle} id="name" className="form-control" placeholder="Deck Name" value={deck.name} />
                <textarea name="description" id="description" className="form-control" placeholder="Breif description of the deck" value={deck.description} />
            </form>
        </>
    )

}

export default CreateDeck;