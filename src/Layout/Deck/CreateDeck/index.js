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
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item">Create Deck</li>
                </ol>
            </nav>
            <form onSubmit={submitFormHandle}>
                <label>Name</label>
                <input type="text" name="name" onChange={changeHandle} id="name" className="form-control" placeholder="Deck Name" value={deck.name} />
                <label>Description</label>
                <textarea rows="4" name="description" onChange={changeHandle} id="description" className="form-control" placeholder="Breif description of the deck" value={deck.description} />
                <Link to="/" className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}

export default CreateDeck;